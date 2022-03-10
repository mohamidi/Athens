import flask
import athens
import athens.api.util as utils


@athens.app.route('/api/v1/members/', methods=['GET'])
def get_members_for_room():
    userId = flask.session.get("userId") or 1
    articleId = flask.request.args.get("articleId")
    roomId = utils.get_room_id(userId, articleId)

    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM users_to_rooms JOIN users ON users.id = users_to_rooms.user WHERE room = ?",
        (roomId,)
    )
    members = cur.fetchall()

    return flask.jsonify(members)
