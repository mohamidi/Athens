import React from 'react';
import Article from './article';

class ArticleContainer extends React.Component{
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
      this.saveState();
    }).catch((exception) => {
      console.log(exception);
    });
  }

  render() {
    const { articles } = this.state;
    const articleList = articles.map((article) => <Article key={article.headline} articleData={article} />)
    return(
      <div id="articleContainer">
        {articleList}
      </div>
    );
  }
}

export default ArticleContainer;