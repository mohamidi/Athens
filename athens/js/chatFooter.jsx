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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: this.state.input }),
            credentials: 'same-origin',
        };
        const url = '/api/v1/messages/create/?userid=1&roomid=1';

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
            <footer className="container-fluid p-0 flex-grow-0 flex-shrink-1 bg-light fixed-bottom">
                <hr className="mt-0" />
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="message" onChange={this.handleChange} value={this.state.input} />
                        </form>
                    </div>
                </div>
            </footer>
        );
    }
}