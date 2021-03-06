from flask import Blueprint, render_template, redirect, jsonify, request
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models.direct_message import DirectMessage
from app.models.inbox import InboxChannel
from app.models import db
from app.forms.direct_message_form import DirectMessageCreateForm, DirectMessageUpdateForm

direct_message_routes = Blueprint("direct_messages", __name__)

@direct_message_routes.route("/<string:uuid>")
def get_direct_message(uuid):
    inbox = InboxChannel.query.filter(InboxChannel.inbox_uuid == uuid).first()
    return inbox.to_dict()

@direct_message_routes.route("/", methods=["POST"])
def create_direct_message():
    form = DirectMessageCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("form in backend1 -----------------------------------------", form.data)
    if form.validate_on_submit():
        direct_message = DirectMessage(
            content = form.content.data,
            user_id = form.user_id.data,
            inbox_channel_id = form.inbox_channel_id.data,
        )
        db.session.add(direct_message)
        db.session.commit()
        print("direct_message in backend --------------", direct_message)
        return direct_message.to_dict()
    return {"error": "could not make message"}


@direct_message_routes.route("/<int:id>", methods=["PUT"])
def update_direct_message(id):
    direct_message = DirectMessage.query.get(id)
    form = DirectMessageUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        direct_message.content = form.content.data
        direct_message.edited = True
        db.session.add(direct_message)
        db.session.commit()
        direct_message.to_dict()
        return direct_message.to_dict()
    return {"error":"could not edit message"}


@direct_message_routes.route("/<int:id>", methods=["DELETE"])
def delete_direct_message(id):
    direct_message = DirectMessage.query.get(id)
    message_deleted = direct_message
    db.session.delete(direct_message)
    db.session.commit()
    return message_deleted.to_dict()
