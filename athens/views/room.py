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
        # User already has room
        roomId = utils.get_room_id(userId, articleId)
        return flask.render_template("room.html")
    except Exception as e:
        # Add user to room
        connection = athens.model.get_db()
        query = """SELECT room FROM users_to_rooms 
        JOIN rooms ON rooms.id = users_to_rooms.room 
        WHERE rooms.article_id = ?"""
        cur = connection.execute(
            query,
            (articleId,)
        )
        roomId = cur.fetchone()

        # No rooms exist for article
        if roomId is None:
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

        # TODO: Determine color dynamically
        color = 1
        roomId = roomId["room"]
        query = """INSERT INTO users_to_rooms(user, room, color)
            VALUES (?, ?, ?)"""
        cur = connection.execute(
            query,
            (userId, roomId, color)
        )
        return flask.render_template("room.html")
