from flask import Blueprint, render_template, redirect, jsonify, request
from app.models.channel_message import ChannelMessage
from app.models import db
from app.forms.channel_message_form import ChannelMessageCreateForm, ChannelMessageUpdateForm
import datetime

channel_message_routes = Blueprint("channel_messages", __name__)

@channel_message_routes.route("/", methods=["POST"])
def create_channel_message():
    form = ChannelMessageCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message = ChannelMessage(
            content = form.content.data,
            user_id = form.user_id.data,
            channel_id = form.channel_id.data,
            timestamp = datetime.datetime.now()
        )
        db.session.add(channel_message)
        db.session.commit()
        return channel_message.to_dict()
    return {"error": "could not make message"}

@channel_message_routes.route('/<int:id>', methods=["PUT"])
def update_channel_message(id):
    channel_message = ChannelMessage.query.get(id)
    form = ChannelMessageUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message.content = form.content.data
        channel_message.edited = True
        db.session.add(channel_message)
        db.session.commit()
        return channel_message.to_dict()
    return {"error":"could nto edit message"}


@channel_message_routes.route("/<int:id>", methods=["DELETE"])
def delete_channel_message(id):
    channel_message = ChannelMessage.query.get(id)
    message_deleted = channel_message
    db.session.delete(channel_message)
    db.session.commit()
    return message_deleted.to_dict()
