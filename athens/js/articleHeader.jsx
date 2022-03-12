import React from 'react';
import PropTypes from 'prop-types';

function ArticleHeader(props) {
  const {
    id, title, publisher, tag, date_published, url, image_url
  } = props
  let link = "/room/?articleId=" + id.toString();
  return (
    <li className="list-group-item">
        <a href={link}>
          <div className="card border-0">
            <div className="row align-items-center justify-content-center">
              <div className="col-10 col-sm-6 col-md-4 p-1">
                <div className="card-body p-0">
                  <h5 className="card-title headline mb-0">{title}</h5>
                  <p className="card-text article-details">
                    {publisher} ~ {date_published} &nbsp;
                    <span className="badge rounded-pill bg-primary">{tag}</span>
                  </p>
                </div>
              </div>
              <div className="col-2 col-sm-1 p-0">
                <div style={{ backgroundImage: 'url(' + image_url + ')' }}
                  className="thumbnail rounded" />
              </div>
            </div>
          </div>
        </a>
      </li>
  );
}

ArticleHeader.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  date_published: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};

export default ArticleHeader;