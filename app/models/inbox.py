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

    def to_dict(self):
        return {
            'id': self.id,
            'user_a': self.user_a,
            'user_b': self.user_b,
            'user_a_hide': self.user_a_hide
            'user_b_hide': self.user_b_hide
        }
