import React from 'react';
import Article from './article';

class ArticleContainer extends React.Component {
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
                    articles: data.articles
                }));
            }).catch((exception) => {
                console.log(exception);
            });
    }

    render() {
        const { articles } = this.state;
        const articleList = articles.map((article) => <Article key={article.id} articleData={article} />)
        return (
            <div id="articleContainer">
                {articleList}
                <div class="signout p-2">
                    <form method="POST" action="/api/v1/signout/">
                        <button class="signout-button" type="submit">Sign out</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ArticleContainer;