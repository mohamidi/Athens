import React from 'react';
import PropTypes from 'prop-types';

function ArticleHeader(props) {
  const {
    headline, source, category, date_published, url, thumbnail
  } = props
  return (
    <li className="list-group-item">
        <a href={url}>
          <div className="card border-0">
            <div className="row align-items-center justify-content-center">
              <div className="col-10 col-sm-6 col-md-4 p-1">
                <div className="card-body p-0">
                  <h5 className="card-title headline mb-0">{headline}</h5>
                  <p className="card-text article-details">
                    {source} ~ {date_published} &nbsp;
                    <span className="badge rounded-pill bg-primary">{category}</span>
                  </p>
                </div>
              </div>
              <div className="col-2 col-sm-1 p-0">
                <div style={{ backgroundImage: 'url(' + thumbnail + ')' }}
                  className="thumbnail rounded" />
              </div>
            </div>
          </div>
        </a>
      </li>
  );
}

ArticleHeader.prototype = {
  headline: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date_published: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ArticleHeader;