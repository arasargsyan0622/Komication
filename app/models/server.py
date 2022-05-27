from .db import db
from app.models.user import User
from app.models.channel import Channel

server_users = db.Table(
    "server_users",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("user.id"),
        primary_key=True
    ),
    db.Column(
        "server_id",
        db.Integer,
        db.ForeignKey("server.id"),
        primary_key=True
    ),
    db.Column(
        "moderator",
        db.Boolean,
        default=False
    ),
)

class Server(db.model):
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

    users = db.relationship("User", secondary=server_users, back_populates="server_user")
