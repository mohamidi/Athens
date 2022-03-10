"""
athens room view.

URLs include:
/room/
"""
import flask
import athens


@athens.app.route('/room/')
def render_room():
    # TODO: add logic for adding user to room or creating new room
    return flask.render_template("room.html")
