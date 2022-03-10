import React from 'react';
import PropTypes from 'prop-types';

function ArticleHeader(props) {
    const {
        title, source, author, category, publishedDate, url, thumbnailUrl
    } = props
    return (
        <div className="articleHeader">
            <li class="list-group-item">
                <a href={url}>
                    <div class="card border-0">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-10 col-sm-6 col-md-4 p-1">
                                <div class="card-body p-0">
                                    <h5 class="card-title headline mb-0">{title}</h5>
                                    <p class="card-text article-details">
                                        {source} ~ {author} ~ {publishedDate}
                                        <span class="badge rounded-pill bg-primary">{category}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-2 col-sm-1 p-0">
                                <div style={{backgroundImage: 'url(' + thumbnailUrl +')'}}
                                    class="thumbnail rounded" />
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </div >
    )
}