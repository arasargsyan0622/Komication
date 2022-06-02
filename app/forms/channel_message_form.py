from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class ChannelMessageCreateForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    user_id = IntegerField("User", validators=[DataRequired()])
    channel_id = IntegerField("Channel", validators=[DataRequired()])
    # submit = SubmitField("Create Channel")

class ChannelMessageUpdateForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    # submit = SubmitField("Create Channel")
