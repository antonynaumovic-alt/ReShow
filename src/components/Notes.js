import React, { Component } from 'react';
import logo from './Enrolle.png';

import './Notes.css';

function App() {
    return (
        <body>
        <div id="NotesPage">
            <svg className="circle">
                <ellipse id="circle" rx="129" ry="125.5" cx="129" cy="125.5">
                </ellipse>
            </svg>
            <div id="Notes">
                <span>Notes</span>
            </div>
            <svg className="bottomBar">
                <rect id="bottomBar" rx="24" ry="24" x="0" y="0" width="1600" height="132">
                </rect>
            </svg>
            <div id="notesList">
            <rect id="notesList" rx="24" ry="24" x="0" y="0" width="1600" height="132">
            </rect>
        </div>
            <div id="supportBtn">
                <button className="supportBtn">Support</button>
            </div>
            <div id="contactBtn">
                <button className="contactBtn">Contact</button>
            </div>

            <form>
                <input type="text" id="inputNotes" name="inputNotes" placeholder=" Note Content"></input>
            </form>

                <div id="Enrolle" className="Enrolle">
                    <img id="Enrolle" src={logo}></img>
                </div>
            <div id="EnrolleBtn">
            <button className="EnrolleBtn">Enrolle</button>
        </div>

            <div id="List_of_Notes">
                <span>List of Notes:</span>
            </div>
            <div id="logoutBtn">
                <button className="logoutBtn">Log Out</button>
            </div>
            <div id="accountBtn">
            <button className="accountBtn">Account</button>
        </div>
            <div id="createBtn">
                <button className="createBtn">Create</button>
            </div>
            <div id="updateBtn">
                <button className="updateBtn">Update</button>
            </div>
        </div>
        </body>

        )
    }

    export default App;