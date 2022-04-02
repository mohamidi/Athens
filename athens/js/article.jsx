import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from './articleHeader';


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
                unread: props.articleData.unread,
                image_url: props.articleData.image_url,
                active: props.articleData.active,
            };
        } else {
            this.state = {
                id: 0,
                title: '',
                publisher: '',
                tag: '',
                created: '',
                unread: 0,
                image_url: '',
                active: false,
            };
        }
    }

    render() {
        const {
            id, title, publisher, tag, created, unread, image_url, active
        } = this.state;

        return (
            <div className="article">
                <ArticleHeader
                    id={id}
                    title={title}
                    publisher={publisher}
                    tag={tag}
                    created={created}
                    unread={unread}
                    image_url={image_url}
                    active={active}
                />
            </div>
        );
    }
}

Article.propTypes = {
    articleData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article