import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from './articleHeader';
import react from 'react';


class Article extends React.Component {

  constructor(props) {

    super(props);
    if (props.articleData) {
      this.state = {
        headline: props.articleData.headline, 
        source: props.articleData.source,
        category: props.articleData.category,
        date_published: props.articleData.date_published,
        url: props.articleData.url, 
        thumbnail: props.articleData.thumbnail, 
      };
    } else {
      this.state = {
        headline: '', 
        source: '',
        category: '',
        date_published: '',
        url: '', 
        thumbnail: '', 
      };
    }
  }

  render() {
    const {
      headline, source, category, date_published, url, thumbnail
    } = this.state;

    return (
      <div className="article">
        <ArticleHeader
          headline={headline}
          source={source}
          category={category}
          date_published={date_published}
          url={url}
          thumbnail={thumbnail}
        />
      </div>
    );
  }
}

Article.propTypes = {
  articleData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article