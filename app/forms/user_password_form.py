from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PasswordUpdateForm(FlaskForm):
    hashed_password = StringField("Password", validators=[DataRequired()])
    old_password = StringField("Old Password", validators=[DataRequired()])
