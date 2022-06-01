from flask import Blueprint, render_template, redirect, jsonify, request
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models import db
from app.forms.channel_message_form import ChannelMessageCreateForm, ChannelMessageUpdateForm

channel_message_routes = Blueprint("channel_messages", __name__)

# @channel_message_routes.route("/")
# def get_all_message():

@channel_message_routes.route("/", methods=["POST"])
def create_channel_message():
    form = ChannelMessageCreateForm()
    print("=-=-=-=-=- my form", form.content.data)
    print("=-=-=-=-=- my form", form.user_id.data)
    print("=-=-=-=-=- my form", form.channel_id.data)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message = ChannelMessage(
            content = form.content.data,
            user_id = form.user_id.data,
            channel_id = form.channel_id.data
        )
        db.session.add(channel_message)
        db.session.commit()
        return  channel_message.to_dict()
    return {"error": "could not make message"}
@channel_message_routes.route("/<int:id>", methods=["DELETE"])
def delete_channel_message(id):
    channel_message = ChannelMessage.query.get(id)
    message_deleted = channel_message
    db.session.delete(channel_message)
    db.session.commit()
    return message_deleted
