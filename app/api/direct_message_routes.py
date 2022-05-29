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
    if form.validate_on_submit():
        direct_message = DirectMessage(
            content = form.content.data,
            user_id = 1,
            inbox_channel_id = 3
        )
        db.session.add(direct_message)
        db.session.commit()
        return {"direct_message": direct_message.to_dict()}


@direct_message_routes.route("/<int:id>", methods=["DELETE"])
def delete_direct_message(id):
    direct_message = DirectMessage.query.get(id)
    db.session.delete(direct_message)
    db.session.commit()
    return jsonify({'success': True})
