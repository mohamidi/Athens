import React from 'react';
import { COLORS } from './constants';

export const ReceivedMessage = ({ message, i }) => {
    return (
        <div key="i" className="pb-1">
            <div className="row justify-content-left m-0">
                <div className="col-2 p-0 d-flex justify-content-center">
                    <div className={"circle d-inline-flex justify-content-center align-items-center " + COLORS[message["color"]]}>
                        <span>{message["firstName"][0]}</span>
                    </div>
                </div>
                <div className="col p-0">
                    <div className="alert alert-dark d-inline-flex m-0 p-1 ps-2 pe-2">
                        <span>{message["message"]}</span>
                    </div>
                </div>
                <div className="col-2 p-0"></div>
            </div>
        </div>
    )
}