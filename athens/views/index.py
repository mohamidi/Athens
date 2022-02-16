"""
athens index (main) view.

URLs include:
/
"""
import flask
import athens


@athens.app.route('/')
def show_index():
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT id, title, publisher, tag, image_url, url FROM articles"
    )
    articles = cur.fetchall()
    context = {
        "articles": articles
    }
    return flask.render_template("index.html", **context)
