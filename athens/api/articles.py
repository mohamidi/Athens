from athens import utils
from dateutil import parser
from datetime import datetime, date, timezone
import requests
import json
import time
import flask
import athens


@athens.app.route('/api/v1/articles/', methods=['GET'])
def fetch_articles():
    today = datetime.utcnow().strftime('%Y-%m-%d')
    last_updated = utils.execute_query(
        "SELECT * FROM update_articles"
    )[0]['last_update']

    if today != last_updated:
        utils.execute_query("DELETE FROM articles")
        utils.execute_query(
            "UPDATE update_articles SET last_update = ? WHERE id = 1",
            today
        )

    update_articles()
    articles = utils.execute_query(
        "SELECT id, title, created, publisher, tag, image_url, url FROM articles"
    )
    context = {'articles': [article for article in articles]}
    return flask.jsonify(**context)


def update_articles():
    sub_key = '60891a9d55124c678989693b9fec9781'
    search_url = 'https://api.bing.microsoft.com/v7.0/news/search'
    params = {'sortBy': 'Relevance', 'mkt': 'en-us',
              'since': str(time.time() - 60*60*24), 'count': '25', }
    headers = {"Ocp-Apim-Subscription-Key": sub_key}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()

    for result in search_results['value']:
        try:
            # Thumbnail can be in two different places; try both
            try:
                thumbnail = result['image']['thumbnail']['contentUrl']
            except KeyError:
                try:
                    thumbnail = result['provider'][0]['image']['thumbnail']['contentUrl']
                except KeyError:
                    thumbnail = 'No url found!'

            date_published = datetime.now(
                timezone.utc) - parser.parse(result.get('datePublished'))
            if date_published.seconds < 3600:
                date_published = f"{int(date_published.seconds / 60)} minutes ago"
            else:
                date_published = f"{int(date_published.seconds / 3600)} hours ago"

            # Make sure no duplicates are entered into DB
            titles = [article['title'] for article in utils.execute_query("Select title from articles")]
            if result['name'] in titles:
                continue

            utils.execute_query(
                "INSERT INTO articles (title, created, publisher, tag, image_url, url) VALUES(?, ?, ?, ?, ?, ?)",
                result['name'],
                date_published,
                result['provider'][0]['name'],
                result.get('category') if result.get('category') else "Other",
                thumbnail,
                result['url'],
            )
        except KeyError:
            # Important info is missing, skip this article
            print("Article skipped")
            continue


@athens.app.route('/api/v1/article/<id>/', methods=['GET'])
def get_article(id):
    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM articles WHERE id = ?",
        (id,)
    )
    return flask.jsonify(cur.fetchone())
