import React from 'react';
import { COLORS } from './constants';

export class Members extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        var mockData = [
            {
                firstName: "Justin",
                userid: 1,
                color: 0,
            },
            {
                firstName: "Hasan",
                userid: 2,
                color: 1,
            },
            {
                firstName: "Muhammad",
                userid: 3,
                color: 2,
            }
        ];
        this.setState({
            members: mockData
        })
        // fetch("http://localhost:8000/api/v1/rooms/", { credentials: 'same-origin' })
        //     .then((response) => {
        //         if (!response.ok) throw Error(response.statusText);
        //         return response.json();
        //     })
        //     .then((data) => {
        //         this.setState({
        //             rooms: data["rooms"]
        //         });
        //     })
        //     .catch((error) => console.log(error));
    }

    render() {
        const { members } = this.state;
        return (
            <div className="members">
                <div style={{ textAlign: "center" }}>
                    {members.map((member, i) => (
                        <div className={"circle d-inline-flex ms-1 me-1 justify-content-center align-items-center " + COLORS[member["color"]]}>
                            <span>{member["firstName"][0]}</span>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}
