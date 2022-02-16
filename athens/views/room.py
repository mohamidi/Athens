"""
athens room view.

URLs include:
/room/
"""
import flask
import athens


@athens.app.route('/room/')
def render_room():
    return flask.render_template("room.html")
