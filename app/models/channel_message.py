from .db import db
from app.models.user import User
from app.models.channel import Channel

class ChannelMessage(db.Model):
    __tablename__ = "channel_messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    edited = db.Column(db.Boolean, default=False)

    user_channel_messages = db.relationship("User", back_populates="channel_user_messages")
    channel_owner = db.relationship("Channel", back_populates="channel_messages")
