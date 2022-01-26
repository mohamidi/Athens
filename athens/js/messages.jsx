import React from 'react';
import io from "socket.io-client";
import { ReceivedMessage } from "./receivedMessage"
import { SentMessage } from "./sentMessage"

let endpoint = "http://localhost:8000"
let socket = io.connect(endpoint)

export class Messages extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        socket.on("message", msg => {
            this.setState({
                messages: msg
            })
        })
        var mockData = [
            {
                message: "This is officially the largest acquisition in video game history. The second largest is Take two acquiring Zynga for almost $13 Billion USD.",
                firstName: "Justin",
                userid: 1,
                color: 0,
            },
            {
                message: "This excerpt about the Metaverse is interesting. Seems like competition will make it a reality more than consumer demand.",
                firstName: "Hasan",
                userid: 2,
                color: 1,
            },
            {
                message: "I noticed that as well. I just recently read this article about Apple's hidden plans for a Metaverse. I'm curious if all of these different Metaverses will remain separate or eventually combine into one.",
                firstName: "Muhammad",
                userid: 3,
                color: 2,
            },
            {
                message: "Short message",
                firstName: "Justin",
                userid: 1,
                color: 0,
            }
        ]
        this.setState({
            messages: mockData
        });
        // fetch("http://localhost:8000/api/v1/messages/", { credentials: 'same-origin' })
        //     .then((response) => {
        //         if (!response.ok) throw Error(response.statusText);
        //         return response.json();
        //     })
        //     .then((data) => {
        //         this.setState({
        //             messages: data["messages"]
        //         });
        //     })
        //     .catch((error) => console.log(error));
    }

    getMessage(message, i) {
        if (1 == message["userid"]) {
            return <SentMessage message={message} i={i} />
        }
        return <ReceivedMessage message={message} i={i} />
        //return <p className="m-0" key={i}>{message["message"]}</p>
    }

    render() {
        const { messages } = this.state;
        return (
            <main role="main" className="container-fluid flex-grow-1 overflow-auto pb-3"
                style={{ flexDirection: "column-reverse", display: "flex", paddingTop: 140 }}>
                <div className="row m-0 justify-content-center" style={{ width: "100%" }}>
                    <div className="col-12 p-0">
                        {messages.map(this.getMessage)}
                    </div>
                </div>
            </main>
        )
    }
}
