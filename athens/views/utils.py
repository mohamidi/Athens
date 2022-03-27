
import athens


def add_user_to_room(userId, articleId):
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
            cur = connection.execute(
                "SELECT * FROM users_to_rooms JOIN users ON users.id = users_to_rooms.user WHERE room = ?",
                (roomId,)
            )
            members = cur.fetchall()

            # Notify existing room members of new member
            athens.socketIo.emit("member-added", members, to=roomId)
            return

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
