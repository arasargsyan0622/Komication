# from .db import db

# server_users = db.Table(
#     "server_users",
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey("user.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "server_id",
#         db.Integer,
#         db.ForeignKey("server.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "moderator",
#         db.Boolean,
#         default=False
#     ),
# )
