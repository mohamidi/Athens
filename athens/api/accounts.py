import flask
import athens


@athens.app.route('/api/v1/login/', methods=['POST'])
def process_login():
    form = flask.request.form.to_dict()
    email = form["email"]
    password = form["password"]

    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT id FROM users WHERE email = ? AND password = ?",
        (email, password)
    )
    userId = cur.fetchone()
    if userId is None:
        return flask.redirect("http://localhost:8000/login"), 500
    userId = userId["id"]
    flask.session["userId"] = userId

    return flask.redirect("http://localhost:8000/home")
