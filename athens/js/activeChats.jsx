import React from 'react';
import Article from './article';

class ActiveChats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };

    }

    componentDidMount() {
        fetch('/api/v1/articles/', { credentials: 'same-origin' })
            .then((response) => response.json()).then((data) => {
                this.setState((previousState) => ({
                    articles: data.articles.filter(article => article.active === true)
                }));
            }).catch((exception) => {
                console.log(exception);
            });
    }

    sortArticles(a, b) {
        if (a["active"] === true && b["active"] === false) {
            return -1;
        } else if (a["unread"] > b["unread"]) {
            return -1;
        } else {
            return 1;
        }
    }

    render() {
        const { articles } = this.state;
        const articleList = articles.sort(this.sortArticles).map((article) => <Article key={article.id} articleData={article} />)
        return (
            <div id="activeChats">
                {articleList}
            </div>
        );
    }
}

export default ActiveChats;