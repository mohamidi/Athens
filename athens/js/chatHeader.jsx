import React from 'react';
import { Members } from './members'

export const ChatHeader = () => {
    return (
        <div className="header fixed-top bg-white">
            <h1 className="pt-2 ps-3 pb-1 m-0">
                Microsoft Buys Activision Blizzard
                <a href="https://news.microsoft.com/2022/01/18/microsoft-to-acquire-activision-blizzard-to-bring-the-joy-and-community-of-gaming-to-everyone-across-every-device/">
                    <i className="bi bi-link-45deg text-primary"></i>
                </a>
            </h1>
            <hr className="mt-0 mb-1" />
            <div className="row">
                <div className="col">
                    <Members />
                </div>
            </div>
            <hr className="mt-1 mb-0" />

        </div>
    )
}
