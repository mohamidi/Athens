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


@athens.app.route('/login/')
def login():
    """Login page"""
    return flask.render_template("login.html")

@athens.app.route('/signup/')
def signup():
    """Sign-up page"""
    return flask.render_template('signup.html')

@athens.app.route('/account/')
def account_page():
    logged_in_user = flask.session.get('userId')

    if not logged_in_user:
        return flask.redirect(flask.url_for('login'))
    return flask.render_template("account.html")
    
@athens.app.route('/account/<id>/')
def account_page_id(id):
    logged_in_user = flask.session.get('userId')

    if not logged_in_user:
        return flask.redirect(flask.url_for('login'))
    return flask.render_template("account.html")