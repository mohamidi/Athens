import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from './articleHeader';
import react from 'react';


class Article extends React.Component {

  constructor(props) {

    super(props);
    if (props.articleData) {
      this.state = {
        title: props.articleData.title, 
        source: props.articleData.source,
        author: props.articleData.author,
        category: props.articleData.category,
        publishedDate: props.articleData.publishedDate,
        url: props.articleData.url, 
        thumbnailUrl: props.articleData.thumbnailUrl, 
      };
    } else {
      this.state = {
        title: '', 
        source: '',
        author: '',
        category: '',
        publishedDate: '',
        url: '', 
        thumbnailUrl: '', 
      };
    }
  }

  render() {
    const {
      title, source, author, category, publishedDate, url, thumbnailUrl
    } = this.state;

    return (
      <div className="article">
        <ArticleHeader
          title={title}
          source={source}
          author={author}
          category={category}
          publishedDate={publishedDate}
          url={url}
          thumbnailUrl={thumbnailUrl}
        />
      </div>
    );
  }
}

Article.PropTypes = {
  articleData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article