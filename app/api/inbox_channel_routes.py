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

    # my_inbox_channels_users = [my_inbox_channels[0].channel_inbox_user]
    my_inbox_channels_users = [list(my_inbox_channel).extend(my_inbox_channel.channel_inbox_user) for my_inbox_channel in my_inbox_channels]
    # my_inbox_channels_users = my_inbox_channels_users
    print(my_inbox_channels)
    print(my_inbox_channels_users)

    return {"inbox_channels": [my_inbox_channel.to_dict() for my_inbox_channel in my_inbox_channels]}
