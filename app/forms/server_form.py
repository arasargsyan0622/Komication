from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class ServerForm(FlaskForm):
    server_name = StringField("Server Name")
    submit = SubmitField("Create Server")
