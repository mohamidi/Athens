"""
athens index (main) view.

URLs include:
/
/home
"""
from ctypes import util
from pathlib import Path

import flask
import athens
from athens import utils


@athens.app.route('/')
def show_index():
    """Route to homepage or login"""
    logged_in_user = flask.session.get('userId')

    if not logged_in_user:
        return flask.redirect(flask.url_for('login'))
    else:
        return flask.redirect(flask.url_for('home_page'))


@athens.app.route('/home/')
def home_page():
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT id, title, publisher, tag, image_url, url FROM articles"
    )
    articles = cur.fetchall()
    context = {
        "articles": articles
    }
    return flask.render_template("index.html", **context)


@athens.app.route("/favicon.ico")
def favicon():
    """Return our favicon."""
    app_root = Path(athens.app.root_path)
    return flask.send_from_directory(
        str(app_root / 'static'),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )
