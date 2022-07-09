from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.user_inbox_channels import user_inbox_channels
from app.models.server_user import server_users as jt

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255), default="http://komication.s3.amazonaws.com/c85fcf48768a4fac810e7ac3ee1a3b85.png")
    online = db.Column(db.Boolean, nullable=False, default=False)
    phone_number = db.Column(db.String(15), unique=True)

    servers = db.relationship("Server", back_populates="owner")
    channel_user_messages = db.relationship("ChannelMessage", back_populates="user_channel_messages")
    direct_user_messages = db.relationship("DirectMessage", back_populates="user_direct_messages")

    inbox_channel_user = db.relationship("InboxChannel", secondary=user_inbox_channels, back_populates="channel_inbox_user")

    server_user = db.relationship("Server", secondary=jt, back_populates="users")

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
            'phone_number': self.phone_number
        }
