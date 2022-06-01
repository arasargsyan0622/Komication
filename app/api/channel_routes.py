from flask import Blueprint, render_template, redirect, jsonify, request
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models import db
from app.forms.channel_form import ChannelCreateForm, ChannelUpdateForm
import uuid

channel_routes = Blueprint("channels", __name__)

@channel_routes.route("/<string:uuid>")
def channel(uuid):
    channel = Channel.query.get(uuid)
    messages = ChannelMessage.query.join(Channel).filter(Channel.id == uuid).all()

    # return {"channels": [channel.to_dict()], "messages": [message.to_dict() for message in messages]}
    return {"channel": channel.to_dict(), "messages": [message.to_dict() for message in messages]}



@channel_routes.route("/", methods=["POST"])
def create_channel():
    print("this is the api route")
    form = ChannelCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("this is the form name -=-=-=-=-=-=-", form.channel_name.data)
    print("this is the form id ===========", form.server_id.data)
    if form.validate_on_submit():
        random_string = ""
        random_uuid = uuid.uuid4()
        string_uuid = random_string.join(str(random_uuid).split("-"))
        channel = Channel (
            channel_name=form.channel_name.data,
            server_id=form.server_id.data,
            channel_uuid=string_uuid
        )
        print("channel uin api", channel)
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()


@channel_routes.route('/<int:id>', methods=["PUT"])
def update_channel(id):
    channel = Channel.query.get(id)
    form = ChannelUpdateForm()
    if form.validate_on_submit():
        channel.channel_name = form.channel_name.data
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()


@channel_routes.route('/<string:uuid>', methods=['DELETE'])
def delete_channel(uuid):
    # channel = Channel.query.get(id)
    print("==========", uuid)
    channel = Channel.query.filter(Channel.channel_uuid == uuid).first()
    print(channel)
    channel_id = channel.id
    server_id = channel.server_id
    db.session.delete(channel)
    db.session.commit()
    return {'channel_id': channel_id, 'server_id':server_id}
