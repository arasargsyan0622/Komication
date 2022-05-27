from .db import db
from app.models.user import User
from app.models.direct_message = DirectMessage

class InboxChannel(db.Model):
    __tablename__ = "inbox_channels"

    id = db.Column(db.Integer, primary_key=True)
    user_a = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_b = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_a_hide = db.Column(db.Boolean, default=False)
    user_b_hide = db.Column(db.Boolean, default=False)

    inbox_messages = db.relationship("DirectMessage", back_populates="inbox_owner")
    user_owners = db.relationship("User", back_populates="inboxes")
