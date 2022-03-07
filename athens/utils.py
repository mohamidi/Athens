"""
Utils files for shared code across different views.

"""
import hashlib
import uuid
import pathlib
import flask
import athens
from athens import model

def execute_query(query, *arguments):
    """Execute a query on the DB with given arguments."""
    _db = model.get_db()
    cursor = _db.execute(query, arguments)
    rows = cursor.fetchall()
    return rows