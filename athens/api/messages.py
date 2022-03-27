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
            "SELECT color FROM users_to_rooms WHERE user = ? and room = ?",
            (message["user"], roomId)
        )
        message["color"] = cur.fetchone()["color"]

        cur = connection.execute(
            "SELECT firstname, lastname FROM users WHERE id = ?",
            (message["user"],)
        )
        user = cur.fetchone()
        message["firstname"] = user["firstname"]
        message["lastname"] = user["lastname"]

    connection.execute(
        "UPDATE users_to_rooms SET unread = unread + 1 WHERE room = ?",
        (roomId,)
    )
    context = {
        "messages": messages,
        "articleId": articleId,
    }
    athens.socketIo.emit("message", context)
    return flask.jsonify(), 204


@athens.socketIo.on("ack-message")
def acknowledge_message(json):
    articleId = json["articleId"]
    userId = flask.session.get("userId")

    # get room of user
    roomId = utils.get_room_id(userId, articleId)

    # decrement unread from users_to_rooms
    connection = athens.model.get_db()
    connection.execute(
        "UPDATE users_to_rooms SET unread = unread - 1 WHERE user = ? and room = ? and unread > 0",
        (userId, roomId,)
    )


@athens.app.route('/api/v1/messages/', methods=['GET'])
def get_messages_for_room():
    userId = flask.session.get("userId")
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
            "SELECT color FROM users_to_rooms WHERE user = ? and room = ?",
            (message["user"], roomId)
        )
        message["color"] = cur.fetchone()["color"]

        cur = connection.execute(
            "SELECT firstname, lastname FROM users WHERE id = ?",
            (message["user"],)
        )
        user = cur.fetchone()
        message["firstname"] = user["firstname"]
        message["lastname"] = user["lastname"]

    connection.execute(
        "UPDATE users_to_rooms SET unread = 0 WHERE user = ? and room = ?",
        (userId, roomId,)
    )

    return flask.jsonify(messages)
