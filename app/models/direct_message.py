from .db import db
from app.models.user import User
from app.models.inbox import InboxChannel

class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    inbox_id = db.Column(db.Integer, db.ForeignKey("inbox_channels.id"), nullable=False)
    edited = db.Column(db.Boolean, default=False)

    user_direct_messages = db.relationship("User", back_populates="direct_user_messages")
    inbox_owner = db.relationship("InboxChannel", back_populates="inbox_messages")
