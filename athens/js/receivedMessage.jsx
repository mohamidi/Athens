import React from 'react';
import { COLORS } from './constants';

export const ReceivedMessage = ({ message, i, includeIcon }) => {
    return (
        <div key={i} className="pb-1">
            {includeIcon &&
                <div className='row justify-content-start m-0'>
                    <div className='col-2 p-0'></div>
                    <div className='col p-0'>
                        <span className='message-name'>{message["firstname"]} {message["lastname"]}</span>
                    </div>
                </div>
            }
            <div className="row justify-content-left m-0">
                <div className="col-2 p-0 d-flex justify-content-center">
                    {includeIcon &&
                        <div className={"circle d-inline-flex justify-content-center align-items-center " + COLORS[message["color"]]}>
                            <span>{message["firstname"][0]}</span>
                        </div>
                    }
                </div>
                <div className="col p-0 text-break">
                    <div className="alert alert-dark d-inline-flex m-0 p-1 ps-2 pe-2">
                        <span style={{ lineHeight: 1.2 }}>{message["message"]}</span>
                    </div>
                </div>
                <div className="col-2 p-0"></div>
            </div>
        </div>
    )
}