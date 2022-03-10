import React from 'react';

export class ChatFooter extends React.Component {
    /* Display number of image and post owner of a single post
     */

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { input: "" };
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
        e.preventDefault();
    }

    handleSubmit(event) {
        if (this.state.input == "") {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: this.state.input }),
            credentials: 'same-origin',
        };
        const url = '/api/v1/messages/create/?articleId=' + this.props.articleId;

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                this.setState({
                    input: "",
                });
                return
            })
            .catch((error) => console.log(error));
        event.preventDefault();
    }

    render() {
        return (
            <div className="bg-white fixed-bottom">
                <hr className="mt-0" />
                <div className="row justify-content-center pb-5">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center align-middle">
                        <form className="input-group" onSubmit={this.handleSubmit} style={{ whiteSpace: "nowrap" }}>
                            <input type="text" className="form-control d-inline" placeholder="Touch to enter text ..." name="message" onChange={this.handleChange} value={this.state.input} />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-primary ps-3 pe-3" onClick={this.handleSubmit}
                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                    <i className="bi bi-send"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}