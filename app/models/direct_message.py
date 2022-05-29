from .db import db
# from app.models import User
# from app.models import InboxChannel
import datetime

class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    inbox_channel_id = db.Column(db.Integer, db.ForeignKey("inbox_channels.id"), nullable=False)
    edited = db.Column(db.Boolean, default=False)

    user_direct_messages = db.relationship("User", back_populates="direct_user_messages")
    inbox_owner = db.relationship("InboxChannel", back_populates="inbox_messages")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'inbox_channel_id': self.inbox_channel_id,
            'edited': self.edited,
        }
