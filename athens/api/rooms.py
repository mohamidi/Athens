"""REST API for comments."""
import json
import flask
import athens


# error handling or bad codes?
@athens.app.route('/api/v1/rooms/', methods=['GET'])
def get_rooms():
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM users"
    )
    rooms = cur.fetchall()
    context = {
        "rooms": rooms
    }
    return flask.jsonify(**context), 201
