import React from 'react';
import PropTypes from 'prop-types';
import { TAG_TO_COLOR } from './constants';

function ArticleHeader(props) {
    const {
        id, title, publisher, tag, created, unread, image_url
    } = props
    let roomLink = "/room/?articleId=" + id.toString();
    return (
        <li className="list-group-item border-top-0">
            <a href={roomLink}>
                <div className="card border-0">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-10 col-sm-6 col-md-4 p-1">
                            <div className="card-body p-0">
                                <h5 className="card-title headline mb-0 article-title">{title}</h5>
                                <p className="card-text article-details">
                                    {publisher} ~ {created} &nbsp;
                                    <span className={"badge rounded-pill " + TAG_TO_COLOR[tag]}>{tag}</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-2 col-sm-1 p-0" style={{ position: "relative" }}>
                            <div style={{ backgroundImage: 'url(' + image_url + ')' }}
                                className="thumbnail rounded" />
                            {unread !== 0 &&
                                <div className="notification bg-danger d-inline-flex justify-content-center align-items-center">
                                    <span>{unread}</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </a>

            {/* <div className="row align-items-center justify-content-center">
              <div className="col-5 col-sm-3 col-md-2 p-1">
                <a href={url}>
                  <button className="btn btn-outline-success" style={{width: "100%"}}>
                    <i className="bi bi-newspaper"></i>
                  </button>
                </a>
              </div>
              <div className="col-5 col-sm-3 col-md-2 p-1">
                <a href={roomLink}>
                  <button className="btn btn-outline-primary" style={{width: "100%"}}>
                    <i className="bi bi-chat"></i>
                  </button>
                </a>
              </div>
              
            </div> */}

        </li>
    );
}

ArticleHeader.prototype = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    unread: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
};

export default ArticleHeader;