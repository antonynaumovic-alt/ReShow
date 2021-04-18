import React, { Component } from 'react';
import logo from '../Enrolle.png';
import exitIcon from './close_window.png';
import minimiseIcon from './minimise_window.png'


import './Chat.css';
import './index.php';
function App() {
    return (
        <body>
            <div id="ChatPage">
                <svg className="chatDisplayBox" viewBox="0 0 552 679.386">
                    <path id="chatDisplayBox" d="M 0 0 L 552 0 L 552 679 L 0 679 L 0 0 Z">
                    </path>
                </svg>
                <form>
                    <input type="text" id="chatInput" name="inputChat" placeholder=" Type your message here..."></input>
                </form>

                <button className="sendBtn">Send</button>
                <button className="minimiseBtn"></button>
                <button className="closeBtn"></button>

                <svg className="topBar">
                    <rect id="topBar" rx="0" ry="0" x="0" y="0" width="435" height="54">
                    </rect>
                </svg>

                <img id="close_window" src={exitIcon}/>
                <img id="minimise_window" src={minimiseIcon}/>

                <div id="roomGroupChat">
                    <span>Room Group Chat</span>
                </div>
                <svg className="verticalLine" viewBox="0 0 4 807">
                    <path id="verticalLine" d="M 0 0 L 0 807">
                    </path>
                </svg>
                <svg className="horizontalLine" viewBox="0 0 552 3">
                    <path id="horizontalLine" d="M 0 0 L 552 0">
                    </path>
                </svg>
            </div>
        </body>

    )
}
export default App;