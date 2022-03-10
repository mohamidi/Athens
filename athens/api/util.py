import athens


def get_room_id(userId, articleId):
    connection = athens.model.get_db()
    query = """SELECT room FROM users_to_rooms 
    JOIN rooms ON rooms.id = users_to_rooms.room 
    WHERE user = ? AND rooms.article_id = ?"""
    cur = connection.execute(
        query,
        (userId, articleId)
    )
    return cur.fetchone()["room"]
