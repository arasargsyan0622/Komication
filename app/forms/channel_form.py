from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class ChannelCreateForm(FlaskForm):
    channel_name = StringField("Channel Name", validators=[DataRequired()])
    server_id = IntegerField("ServerId", validators=[DataRequired()])


class ChannelUpdateForm(FlaskForm):
    channel_name = StringField("Channel Name", validators=[DataRequired()])
