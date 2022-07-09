from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UsernameUpdateForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
