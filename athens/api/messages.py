"""REST API for comments."""
import json
import flask
import athens
import athens.api.util as utils


@athens.app.route('/api/v1/messages/create/', methods=['POST'])
def create_message():
    userId = flask.session.get("userId", 1)
    articleId = flask.request.args.get("articleId")
    roomId = utils.get_room_id(userId, articleId)
    message = flask.request.json["message"]
    connection = athens.model.get_db()
    connection.execute(
        "INSERT INTO messages(message, user, room) VALUES (?, ?, ?)",
        (message, userId, roomId)
    )
    cur = connection.execute(
        "SELECT * FROM messages WHERE room = ?",
        (roomId,)
    )
    messages = cur.fetchall()
    for message in messages:
        cur = connection.execute(
            "SELECT color FROM users_to_rooms WHERE user = ?",
            (message["user"],)
        )
        message["color"] = cur.fetchone()["color"]

        cur = connection.execute(
            "SELECT firstname FROM users WHERE id = ?",
            (message["user"],)
        )
        message["firstname"] = cur.fetchone()["firstname"]
    athens.socketIo.send(messages, broadcast=True)
    return flask.jsonify(), 204


@athens.app.route('/api/v1/messages/', methods=['GET'])
def get_messages_for_room():
    userId = flask.session.get("userId") or 1
    articleId = flask.request.args.get("articleId")
    roomId = utils.get_room_id(userId, articleId)

    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM messages WHERE room = ?",
        (roomId,)
    )
    messages = cur.fetchall()
    for message in messages:
        cur = connection.execute(
            "SELECT color FROM users_to_rooms WHERE user = ?",
            (message["user"],)
        )
        message["color"] = cur.fetchone()["color"]

        cur = connection.execute(
            "SELECT firstname FROM users WHERE id = ?",
            (message["user"],)
        )
        message["firstname"] = cur.fetchone()["firstname"]

    return flask.jsonify(messages)
