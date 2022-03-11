from dateutil import parser
from datetime import datetime, timezone
import requests
import json
import time
import flask
import athens


@athens.app.route('/api/v1/articles/', methods=['GET'])
def format_api():
	context = {'articles':[]}
	
	sub_key = '60891a9d55124c678989693b9fec9781'
	search_url = 'https://api.bing.microsoft.com/v7.0/news/search'
	params = {'sortBy': 'Relevance', 'mkt': 'en-us', 'since': str(time.time() - 60*60*24), 'count':'25',}
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

			date_published = datetime.now(timezone.utc) - parser.parse(result.get('datePublished'))
			if date_published.seconds < 3600:
				date_published = f"{int(date_published.seconds / 60)} minutes ago"
			else:
				date_published = f"{int(date_published.seconds / 3600)} hours ago"

			context['articles'].append(
				{'headline': result['name'],
				'url': result['url'],
				'thumbnail': thumbnail,
				'date_published': date_published,
				'source': result['provider'][0]['name'],
				'category': result.get('category') if result.get('category') else "Other",
				}
			)
		except KeyError:
			# Important info is missing, skip this article
			print("Article skipped")
			continue

	return flask.jsonify(**context)
	
def get_article():
    articleId = flask.request.args.get("articleId")

    connection = athens.model.get_db()
    cur = connection.execute(
        "SELECT * FROM articles WHERE id = ?",
        (articleId,)
    )
    return flask.jsonify(cur.fetchone())
