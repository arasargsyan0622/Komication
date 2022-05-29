from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class DirectMessageCreateForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    user_id = IntegerField("User", validators=[DataRequired()])
    inbox_channel_id = IntegerField("User", validators=[DataRequired()])
    submit = SubmitField("Create Channel")

class DirectMessageUpdateForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    submit = SubmitField("Create Channel")
