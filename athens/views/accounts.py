"""
athens index (main) view.

URLs include:
/login
/sign-up
"""
from pathlib import Path

import flask
import athens
from athens import utils


@athens.app.route('/login')
def login():
    """Login page"""
    flask.session['username'] = 'Test'
    return flask.render_template("login.html")


def signup():
    """Sign-up page"""
    return flask.render_template('create.html')