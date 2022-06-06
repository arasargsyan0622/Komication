from operator import ne
from flask import Blueprint, render_template, redirect, jsonify, request
from app.forms.inbox_form import UserInboxCreateForm
from app.models.channel import Channel
from app.models.server import Server
from app.models.user import User
from app.models.inbox import InboxChannel
from app.models.channel_message import ChannelMessage
from app.models.direct_message import DirectMessage
from app.models import db
import uuid

inbox_channel_routes = Blueprint("inbox_channel", __name__)

@inbox_channel_routes.route("/<int:id>")
def get_user_inbox_channels(id):

    current_user = User.query.get(id)
    my_inbox_channels = current_user.inbox_channel_user
    my_inbox_channels_users = []
    [my_inbox_channels_users.extend(my_inbox_channel.channel_inbox_user) for my_inbox_channel in my_inbox_channels]
    my_inbox_channels_users_filtered = [x for x in my_inbox_channels_users if x.id != id]
    inboxes = [my_inbox_channel.to_dict() for my_inbox_channel in my_inbox_channels]
    users = [x.to_dict() for x in my_inbox_channels_users_filtered]
    for i in range(len(inboxes)):
        inboxes[i]["users"] = users[i]
    return { "inbox_channels": [inbox for inbox in inboxes]}

@inbox_channel_routes.route("/<int:id>", methods=["POST"])
def create_inbox_channel(id):
    form = UserInboxCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    current_user = User.query.get(id)
    new_user = User.query.filter(User.username == form.newUser.data).first()
    # inbox_a = InboxChannel.query.filter(current_user in InboxChannel.channel_inbox_user and new_inbox in InboxChannel.channel_inbox_user).first()
    # print("-----------------------")
    # print("-=-=-=-", current_user.inbox_channel_user)
    # print(current_user.inbox_channel_user[3].channel_inbox_user)
    # print(new_user in current_user.inbox_channel_user[3].channel_inbox_user)
    myInbox = [inbox for inbox in current_user.inbox_channel_user if new_user in inbox.channel_inbox_user ]
    print(myInbox)
    print(len(myInbox))
    print(not len(myInbox))
    print("-----------------------")
    print("-----------------------")
    print("-----------------------")
    print("-----------------------")


        # return myInbox[0].to_dict()
    # print(InboxChannel.channel_inbox_user)
    # print("-----------------------")
    if not len(myInbox):
        if form.validate_on_submit():
            random_string = ""
            random_uuid = uuid.uuid4()
            string_uuid = random_string.join(str(random_uuid).split("-"))
            new_inbox = InboxChannel(inbox_uuid= string_uuid)
            new_inbox.channel_inbox_user.append(current_user)
            new_inbox.channel_inbox_user.append(new_user)

            # print("====================")
            # print(id)
            # print(new_user)
            # print(form.newUser.data)
            # print(new_inbox)
            # print(new_inbox.channel_inbox_user)
            # print(new_inbox.users)
            # print("====================")
            db.session.add(new_inbox)
            db.session.commit()
            test = new_inbox.to_dict()
            test["users"] = new_user.to_dict()
            # print("==-=-=-=-", test)
            # send inbox state with new user to match get inbox state
            return test

    if myInbox[0]:
        test = myInbox[0].inbox_uuid
        print("====================")
        print("existing inbox")
        print(test)
        print("====================")
        return {"message": test}

@inbox_channel_routes.route("/hide/<int:id>", methods=["POST"])
def hide_inbox_channel(id):
    current_inbox_channel = InboxChannel.query.get(id)

    current_inbox_channel.user_a_hide = True

    db.session.add(current_inbox_channel)
    db.session.commit()

    return {"inbox_channel": current_inbox_channel.to_dict()}
