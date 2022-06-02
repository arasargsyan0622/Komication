from flask import Blueprint, render_template, redirect, jsonify
from app.models.channel import Channel
from app.models.server import Server
from app.models.user import User
from app.models.inbox import InboxChannel
from app.models.channel_message import ChannelMessage
from app.models.direct_message import DirectMessage
from app.models import db

inbox_channel_routes = Blueprint("inbox_channel", __name__)

@inbox_channel_routes.route("/<int:id>")
def get_user_inbox_channels(id):

    current_user = User.query.get(id)

    my_inbox_channels = current_user.inbox_channel_user
    print(my_inbox_channels)
    my_inbox_channels_users = []

    # spreads the users in a list
    [my_inbox_channels_users.extend(my_inbox_channel.channel_inbox_user) for my_inbox_channel in my_inbox_channels]

    my_inbox_channels_users_filtered = [x for x in my_inbox_channels_users if x.id != id]

    return {"inbox_channels": [my_inbox_channel.to_dict() for my_inbox_channel in my_inbox_channels], "users": [x.to_dict() for x in my_inbox_channels_users_filtered] }

@inbox_channel_routes.route("/<int:id>", methods=["POST"])
def create_inbox_channel(id):
    new_inbox = InboxChannel()

    current_user = User.query.get(id)

    new_inbox.channel_inbox_user.append(current_user)

    db.session.add(new_inbox)
    db.session.commit()

    return {"inbox_channel": new_inbox.to_dict()}

@inbox_channel_routes.route("/hide/<int:id>", methods=["POST"])
def hide_inbox_channel(id):
    current_inbox_channel = InboxChannel.query.get(id)

    current_inbox_channel.user_a_hide = True

    db.session.add(current_inbox_channel)
    db.session.commit()

    return {"inbox_channel": current_inbox_channel.to_dict()}
