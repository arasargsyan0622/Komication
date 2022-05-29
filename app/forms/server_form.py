from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ServerCreateForm(FlaskForm):
    server_name = StringField("Server Name", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    submit = SubmitField("Create Server")


class ServerUpdateForm(FlaskForm):
    server_name = StringField("Server Name", validators=[DataRequired()])
    private = BooleanField("Private")
    server_icon_url = StringField("Icon")
    banner_url = StringField("Banner")
    submit = SubmitField("Create Server")
