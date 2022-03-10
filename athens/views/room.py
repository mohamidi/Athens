"""
athens room view.

URLs include:
/room/
"""
import flask
import athens
import athens.api.util as utils


@athens.app.route('/room/')
def render_room():
    userId = flask.session.get("userId", 1)
    articleId = flask.request.args.get("articleId")

    try:
        # See if user is already assigned to room for article
        roomId = utils.get_room_id(userId, articleId)
        return flask.render_template("room.html")
    except Exception as e:
        connection = athens.model.get_db()
        query = """SELECT room, COUNT() as members FROM users_to_rooms 
        JOIN rooms ON rooms.id = users_to_rooms.room 
        WHERE rooms.article_id = ? GROUP BY rooms.id"""
        cur = connection.execute(
            query,
            (articleId,)
        )
        openRooms = cur.fetchall()

        # Add user to existing room if possible
        for room in openRooms:
            if room["members"] < 5:
                roomId = room["room"]
                color = int(room["members"])
                query = """INSERT INTO users_to_rooms(user, room, color)
                    VALUES (?, ?, ?)"""
                cur = connection.execute(
                    query,
                    (userId, roomId, color)
                )
                return flask.render_template("room.html")

        # Create new room
        query = """INSERT INTO rooms(article_id)
        VALUES (?)"""
        cur = connection.execute(
            query,
            (articleId,)
        )
        newRoomId = cur.lastrowid

        # Add user to new room
        query = """INSERT INTO users_to_rooms(user, room, color)
        VALUES (?, ?, ?)"""
        cur = connection.execute(
            query,
            (userId, newRoomId, 0)
        )
        return flask.render_template("room.html")
