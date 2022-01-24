"""REST API for comments."""
import json
import flask
import athens


# error handling or bad codes?
@athens.app.route('/api/v1/messages/', methods=['GET'])
def get_messages():
    """Create a comment for specific post."""
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM messages"
    )
    messages = cur.fetchall()
    context = {
        "messages": messages
    }
    return flask.jsonify(**context), 201


@athens.app.route('/api/v1/messages/create/', methods=['POST'])
def create_message():
    """Delete a comment."""
    message = flask.request.json["message"]
    userid = flask.request.args.get("userid")
    roomid = flask.request.args.get("roomid")
    connection = athens.model.get_db()
    connection.execute(
        "INSERT INTO messages(message, user, room) VALUES (?, ?, ?)",
        (message, userid, roomid)
    )
    cur = connection.execute(
        "SELECT * FROM messages"
    )

    messages = cur.fetchall()
    athens.socketIo.send(messages, broadcast=True)
    return flask.jsonify(), 204
