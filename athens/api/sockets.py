import flask
from flask_socketio import join_room, leave_room, emit
import athens
import athens.api.util as utils


@athens.socketIo.on('join')
def on_join(data):
    userId = flask.session["userId"]
    articleId = data["articleId"]
    roomId = utils.get_room_id(userId, articleId)
    join_room(roomId)
    print(str(userId) + " has entered the room " + str(roomId))


@athens.socketIo.on('leave')
def on_leave(data):
    print("Leave called")
    userId = flask.session["userId"]
    articleId = data["articleId"]
    roomId = utils.get_room_id(userId, articleId)
    leave_room(roomId)
    print(str(userId) + " has left the room " + str(roomId))


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
