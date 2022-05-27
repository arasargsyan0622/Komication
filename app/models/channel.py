from .db import db
from app.models.server import Server
from app.models.channel_message import ChannelMessage

class Channel(db.Model):
    __tablename__ = "channels"

    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)

    server_owner = db.relationship("Server", back_populates="channels")
    channel_messages = db.relationship("ChannelMessage", back_populates="channel_owner")
