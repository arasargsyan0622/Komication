from flask import Blueprint, render_template, redirect, jsonify
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models import db
from app.forms.channel_form import ChannelCreateForm, ChannelUpdateForm

channel_routes = Blueprint("channels", __name__)

@channel_routes.route("/<int:id>")
def channel(id):
    channel = Channel.query.get(id)
    messages = ChannelMessage.query.join(Channel).filter(Channel.id == id).all()

    return {"channels": [channel.to_dict()], "messages": [message.to_dict() for message in messages]}


@channel_routes.route("/", methods=["POST"])
def create_channel():
    form = ChannelCreateForm()
    if form.validate_on_submit():
        channel = Channel (
            channel_name=form.channel_name.data,
            server_id=form.server_id.data,
        )
        db.session.add(channel)
        db.session.commit()
        return {"channel": channel.to_dict()}


@channel_routes.route('/<int:id>', methods=["PUT"])
def update_channel(id):
    channel = Channel.query.get(id)
    form = ChannelUpdateForm()
    if form.validate_on_submit():
        channel.channel_name = form.channel_name.data
        db.session.add(channel)
        db.session.commit()
        return {"channel": channel.to_dict()}


@channel_routes.route('/<int:id>', methods=['DELETE'])
def delete_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return jsonify({'success': True})