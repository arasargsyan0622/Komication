from .db import db

user_inbox_channels = db.Table(
    "user_inbox_channels",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("inbox_id", db.Integer, db.ForeignKey("inbox_channels.id"), primary_key=True),
)
