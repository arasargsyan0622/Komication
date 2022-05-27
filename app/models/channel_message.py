from .db import db
# from app.models import User
# from app.models import Channel
import datetime

class ChannelMessage(db.Model):
    __tablename__ = "channel_messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    edited = db.Column(db.Boolean, default=False)

    user_channel_messages = db.relationship("User", back_populates="channel_user_messages")
    channel_owner = db.relationship("Channel", back_populates="channel_messages")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'edited': self.edited,
        }
