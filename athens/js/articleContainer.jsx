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
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=c8f65982aa0c4d05bba8517c9cd4d34f', { credentials: 'same-origin' })
    .then((response) => response.json()).then((data) => {
      this.setState((previousState) => ({
        articles: data.sources
      }));
      this.saveState();
    }).catch((exception) => {
      console.log(exception);
    });
  }

  render() {
    const { articles } = this.state;
    const articleList = articles.map((article) => <Article key={article.title} articleData={article} />)
    return(
      <div id="articleContainer">
        {articleList}
      </div>
    );
  }
}

export default ArticleContainer;