import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from './articleHeader';
import react from 'react';


class Article extends React.Component {

  constructor(props) {

    super(props);
    if (props.articleData) {
      this.state = {
        id: props.articleData.id,
        title: props.articleData.title, 
        publisher: props.articleData.publisher,
        tag: props.articleData.tag,
        created: props.articleData.created,
        url: props.articleData.url, 
        image_url: props.articleData.image_url, 
      };
    } else {
      this.state = {
        id: 0,
        title: '', 
        publisher: '',
        tag: '',
        created: '',
        url: '', 
        image_url: '', 
      };
    }
  }

  render() {
    const {
      id, title, publisher, tag, created, url, image_url
    } = this.state;

    return (
      <div className="article">
        <ArticleHeader
          id={id}
          title={title}
          publisher={publisher}
          tag={tag}
          created={created}
          url={url}
          image_url={image_url}
        />
      </div>
    );
  }
}

Article.propTypes = {
  articleData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article