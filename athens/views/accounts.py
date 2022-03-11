"""
athens index (main) view.

URLs include:
/login
/sign-up
"""

import flask
import athens
from athens import utils
import athens.config as config


@athens.app.route('/login')
def login():
    """Login page"""
    return flask.render_template("login.html")


def signup():
    """Sign-up page"""
    return flask.render_template('create.html')
