from .db import db
# from app.models import User
# from app.models import Channel
from app.models.server_user import server_users as jt


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.String(50), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)
    server_icon_url = db.Column(db.String(255))
    server_invite_url = db.Column(db.String(255), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    banner_url = db.Column(db.String(255))

    owner = db.relationship("User", back_populates="servers")
    channels = db.relationship("Channel", back_populates="server_owner")

    users = db.relationship("User", secondary=jt, back_populates="server_user")

    def to_dict(self):
        return {
            'id': self.id,
            'server_name': self.server_name,
            'private': self.private,
            'server_icon_url': self.server_icon_url,
            'server_invite_url': self.server_invite_url,
            'user_id': self.user_id,
            'banner_url': self.banner_url,
        }
