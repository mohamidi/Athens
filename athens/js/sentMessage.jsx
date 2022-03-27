import React from 'react';
import { COLORS } from './constants';

export const SentMessage = ({ message, includeIcon }) => {
    return (
        <div className="pb-1">
            {includeIcon &&
                <div className='row justify-content-end m-0'>
                    <div className='col text-end p-0'>
                        <span className='message-name'>{message["firstname"]} {message["lastname"]}</span>
                    </div>
                    <div className='col-2 p-0'></div>
                </div>
            }
            <div className="row justify-content-right m-0">
                <div className="col-2 p-0"></div>
                <div className="col p-0 text-break d-inline-flex flex-row-reverse">
                    <div className="message alert alert-primary d-inline-flex m-0 p-1 ps-2 pe-2">
                        <span>{message["message"]}</span>
                    </div>
                </div>
                <div className="col-2 p-0 d-flex justify-content-center">
                    {includeIcon &&
                        <div className={"circle d-inline-flex justify-content-center align-items-center " + COLORS[message["color"]]}>
                            <span>{message["firstname"][0]}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}