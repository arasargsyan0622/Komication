from flask import Blueprint, render_template, redirect, jsonify
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models.direct_message import DirectMessage
from app.models import db
from app.forms.direct_message_form import DirectMessageCreateForm, DirectMessageUpdateForm

direct_message_routes = Blueprint("direct_messages", __name__)

@direct_message_routes.route("/", methods=["POST"])
def create_direct_message():
    form = DirectMessageCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        direct_message = DirectMessage(
            content = form.content.data,
            user_id = form.user_id.data,
            inbox_channel_id = form.inbox_channel_id
        )
        db.session.add(direct_message)
        db.session.commit()
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
