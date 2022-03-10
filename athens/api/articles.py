import flask
import athens


@athens.app.route('/api/v1/articles/', methods=['GET'])
def get_article():
    articleId = flask.request.args.get("articleId")

    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM articles WHERE id = ?",
        (articleId,)
    )
    return flask.jsonify(cur.fetchone())
