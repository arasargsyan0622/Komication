from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class ChannelForm(FlaskForm):
    channel_name = StringField("Channel Name")
    submit = SubmitField("Create Channel")
