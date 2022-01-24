"""athens development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'\x084\xfa!\xba\x9a\x18\xc0\x92\xf0qG\x0ej \
    \x1f{\xb5=(6\x05S\xba\xbf'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
ATHENS_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = ATHENS_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/athens.sqlite3
DATABASE_FILENAME = ATHENS_ROOT/'var'/'athens.sqlite3'
