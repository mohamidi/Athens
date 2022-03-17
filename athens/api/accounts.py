import email
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
        return flask.redirect("/login/")
    userId = userId["id"]
    flask.session["userId"] = userId

    return flask.redirect("/home/")


@athens.app.route('/api/v1/signup/', methods=['POST'])
def process_signup():
    form = flask.request.form.to_dict()
    firstname = form["firstname"]
    lastname = form["lastname"]
    email = form["email"]
    password = form["password"]

    connection = athens.model.get_db()
    cur = connection.execute(
        "INSERT INTO users(email, firstname, lastname, password) VALUES(?,?,?,?)",
        (email, firstname, lastname, password)
    )
    cur = connection.execute(
        "SELECT id FROM users WHERE email = ? AND password = ?",
        (email, password)
    )
    userId = cur.fetchone()
    if userId is None:
        return flask.redirect("/login/"), 500
    userId = userId["id"]
    flask.session["userId"] = userId

    return flask.redirect("/home/")


@athens.app.route('/api/v1/signout/', methods=['POST'])
def process_signout():
    flask.session.clear()
    return flask.redirect("/login/")


@athens.app.route('/api/v1/info/', methods=['GET'])
def get_info():
    connection = athens.model.get_db()
    id = flask.session["userId"]
    cur = connection.execute(
        "SELECT email, firstname, lastname FROM users WHERE id = ?",
        (id,)
    )
    results = cur.fetchone()
    print(results)
    message = {
        "email": results["email"],
        "firstname": results["firstname"],
        "lastname": results["lastname"],
    }
    return flask.jsonify(message)
