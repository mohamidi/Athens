"""
athens room view.

URLs include:
/room/
"""
import flask
import athens
import athens.api.util as utils
import athens.views.utils as roomUtils


@athens.app.route('/room/')
def render_room():
    userId = flask.session.get("userId")
    if userId is None:
        flask.redirect("/login/")

    articleId = flask.request.args.get("articleId")

    if articleId is None:
        flask.redirect("/home/")

    try:
        # See if user is already assigned to room for article
        roomId = utils.get_room_id(userId, articleId)
        return flask.render_template("room.html")
    except Exception as e:
        roomUtils.add_user_to_room(userId, articleId)
        return flask.render_template("room.html")
