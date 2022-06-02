from .db import db
from app.models.user_inbox_channels import user_inbox_channels

# from app.models import User
# from app.models import DirectMessage

class InboxChannel(db.Model):
    __tablename__ = "inbox_channels"

    id = db.Column(db.Integer, primary_key=True)
    user_a_hide = db.Column(db.Boolean, default=False)
    user_b_hide = db.Column(db.Boolean, default=False)
    inbox_uuid = db.Column(db.String(255), nullable=False, unique=True)

    inbox_messages = db.relationship("DirectMessage", back_populates="inbox_owner")
    channel_inbox_user = db.relationship("User", secondary=user_inbox_channels, back_populates="inbox_channel_user")

    def to_dict(self):
        return {
            'id': self.id,
            'user_a_hide': self.user_a_hide,
            'user_b_hide': self.user_b_hide,
            'inbox_uuid': self.inbox_uuid,
        }
