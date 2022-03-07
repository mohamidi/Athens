"""athens package initializer."""
import flask
from flask_socketio import SocketIO

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
socketIo = SocketIO(app)

# Read settings from config module (athens/config.py)
app.config.from_object('athens.config')

# Overlay settings read from a Python file whose path is set in the environment
# variable ATHENS_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export ATHENS_SETTINGS=secret_key_config.py
app.config.from_envvar('ATHENS_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import athens.utils # noqa: E402  pylint: disable=wrong-import-position
import athens.api  # noqa: E402  pylint: disable=wrong-import-position
import athens.views  # noqa: E402  pylint: disable=wrong-import-position
import athens.model  # noqa: E402  pylint: disable=wrong-import-position