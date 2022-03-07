"""
athens index (main) view.

URLs include:
/
/home
"""
from pathlib import Path

import flask
import athens
from athens import utils

@athens.app.route('/')
def show_index():
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT id, title, publisher, tag, image_url, url FROM articles"
    )
    articles = cur.fetchall()
    context = {
        "articles": articles
    }
    return flask.render_template("login.html", **context)

@athens.app.route('/home')
def show_home_page():
    # TODO:  Add articles to home page; 
    context = {}
    return flask.render_template("home_page.html", **context)

@athens.app.route("/favicon.ico")
def favicon():
    """Return our favicon."""
    app_root = Path(athens.app.root_path)
    return flask.send_from_directory(
        str(app_root / 'static'),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )