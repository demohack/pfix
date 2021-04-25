from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FloatField, DateField, IntegerField
from wtforms.validators import InputRequired, Optional, Email, URL, ValidationError

class RegisterUser(FlaskForm):
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired()])
    first_name = StringField("First Name", validators=[InputRequired()])
    last_name = StringField("Last Name", validators=[InputRequired()])

class LoginUser(FlaskForm):
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])


