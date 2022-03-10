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
    flask.session['username'] = 'Test'
    flask.session["userId"] = config.COUNT
    config.COUNT = config.COUNT + 1
    return flask.render_template("login.html")


def signup():
    """Sign-up page"""
    return flask.render_template('create.html')
