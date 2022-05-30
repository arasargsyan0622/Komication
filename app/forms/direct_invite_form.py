from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class DirectInviteForm(FlaskForm):
    invite_url = StringField("Invite Link", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    submit = SubmitField("Join Server")
