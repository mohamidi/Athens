import React from 'react';
import { Members } from './members'

export class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { article: {} };
    }

    componentDidMount() {
        fetch("/api/v1/articles/?articleId=" + this.props.articleId,
            { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    article: data
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { article } = this.state;
        return (
            <div className="header bg-white sticky-top">
                <h1 className="pt-2 ps-3 pb-1 m-0">
                    {article["title"]}
                    <a href={article["url"]}>
                        <i className="bi bi-link-45deg text-primary"></i>
                    </a>
                </h1>
                <hr className="mt-0 mb-1" />
                <div className="row">
                    <div className="col">
                        <Members articleId={this.props.articleId} />
                    </div>
                </div>
                <hr className="mt-1 mb-0" />
            </div>
        );
    }
}