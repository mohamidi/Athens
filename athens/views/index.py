"""
athens index (main) view.

URLs include:
/
"""
import flask
import athens


@athens.app.route('/')
def show_index():
    return flask.render_template("index.html")
