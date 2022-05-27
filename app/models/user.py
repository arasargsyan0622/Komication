from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models import Server
from app.models import ChannelMessage
from app.models import InboxChannel
from app.models import DirectMessage

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255))
    online = db.Column(db.Boolean, nullable=False, default=False)

    servers = db.relationship("Server", back_populates="owner")
    channel_user_messages = db.relationship("ChannelMessage", back_populates="user_channel_messages")
    direct_user_messages = db.relationship("DirectMessage", back_populates="user_direct_messages")
    inboxes = db.relationship("InboxChannel", back_populates="user_owners")

    server_user = db.relationship("Server", secondary=server_users, back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar_url': self.avatar_url,
            'online': self.online,
        }
