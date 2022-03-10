import flask
import athens
import athens.api.util as utils


@athens.app.route('/api/v1/rooms/', methods=['GET'])
def get_room_info():
    articleId = flask.request.args.get("articleId")
    userId = flask.session.get("userId", 1)
    context = {
        "userId": userId,
        "roomId": utils.get_room_id(userId, articleId)
    }
    return flask.jsonify(context)
