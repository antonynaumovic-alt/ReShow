import React, { Component } from 'react';
import logo from './Enrolle_bn.png';

import './Rooms.css';

function App() {
    return (

        <body>
        <div id="RoomPage">

                <div id="Enrolle" className="Enrolle">
                    <img id="Enrolle" src={logo}/>
                </div>
            <div id="EnrolleBtn">
                <button className="EnrolleBtn">Enrolle</button>
            </div>
            <svg className="Ellipse_689">
                <ellipse id="Ellipse_689" rx="129" ry="125.5" cx="129" cy="125.5">
                </ellipse>
            </svg>
            <div id="Rooms">
                <span>Rooms</span>
            </div>
            <form>
                <input type="text" id="inputCreate" name="createInput" placeholder=" Create room URL"></input>
                    <input type="text" id="inputJoin" name="joinInput" placeholder=" Join room URL"></input>
            </form>
            <div id="createBtn">
                 <button className="createBtn">Create</button>
        </div>
            <div id="joinBtn">
                <button className="joinBtn">Join</button>
            </div>

            <svg className="Rectangle_276">
                <rect id="Rectangle_276" rx="24" ry="24" x="0" y="0" width="1600" height="132">
                </rect>
            </svg>
            <div id="supportBtn">
                <button className="supportBtn">Support</button>
            </div>
            <div id="contactBtn">
                <button className="contactBtn">Contact</button>
            </div>
            <div id="logoutBtn">
                <button className="logoutBtn">Log Out</button>
            </div>
            <div id="accountBtn">
                <button className="accountBtn">Account</button>
            </div>
            <div id="backBtn">
                <button className="backBtn">Back</button>
            </div>
        </div>
        </body>
        )
    }

    export default App;