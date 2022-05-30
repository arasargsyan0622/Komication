from flask import Blueprint, render_template, redirect, jsonify
from app.models.user import User
from app.models.channel import Channel
from app.models.server import Server
from app.models.channel_message import ChannelMessage
from app.models import db
from app.forms.direct_invite_form import DirectInviteForm

direct_invite_routes = Blueprint("direct_invites", __name__)

@direct_invite_routes.route("/", methods=["POST"])
def join_server():
    form = DirectInviteForm()
    if form.validate_on_submit():
        invite_url = form.invite_url.data
        user_id = form.user_id.data

        current_user = User.query.get(user_id)

        searched_server = Server.query.filter(Server.server_invite_url == invite_url).first()

        current_user.server_user.append(searched_server)

        db.session.add(current_user)
        db.session.commit()

        return jsonify({'success on join': True})
