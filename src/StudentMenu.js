import React, { Component } from 'react';
import logo from './Enrolle_bn.png';
import settingsIcon from './settings_icon.png';
import lessonIcon from './lesson_icon.png'
import calendarIcon from './calendar_icon.png'
import notesIcon from './notes_icon.png'

import './StudentMenu.css';

function App() {
    return (

        <body>
        <div id="StudentMenu">
                    <div id="Enrolle" className="Enrolle">
                        <img id="Enrolle" src={logo}/>
                </div>
        <div id="EnrolleBtn">
            <button className="EnrolleBtn">Enrolle</button>
        </div>
            <div id="logoutBtn">
                <button className="logoutBtn">Log Out</button>
            </div>

            <div id="accountBtn">
                <button className="accountBtn">Account</button>
            </div>
            <div id="Level_1">
                    <div id="NotesBtn">
                        <button className= "NotesBtn">Notes</button>
                        </div>
                    <div id="Homework">
                        <button className="HomeworkBtn">Homework</button>
                    </div>
                    <div id="RoomsBtn">
                        <button className="RoomsBtn">Rooms</button>
                    </div>
                    <div id="GradesBtn">
                        <button className="GradesBtn">Grades</button>
                    </div>
                    <div id="ScheduleBtn">
                        <button className="ScheduleBtn">Schedule</button>
                    </div>
                    <div id="ModulesBtn">
                        <button className="ModulesBtn">Modules</button>
                    </div>
                    <div id="Announcements">
                        <button className="AnnouncementsBtn">Announcements</button>
                    </div>
            </div>
            <div id="Background">
                <svg className="BackgroundStyling" viewBox="407.047 -8675.743 625.173 959.795">
                    <path id="BackgroundStyling"
                          d="M 1032.220092773438 -8674.615234375 L 1032.220092773438 -7715.94921875 L 407.0469665527344 -7715.9482421875 C 407.0469665527344 -7715.9482421875 567.56494140625 -8125.15673828125 567.56494140625 -8675.24609375 C 567.7723999023438 -8676.658203125 1032.220092773438 -8674.615234375 1032.220092773438 -8674.615234375 Z">
                    </path>
                </svg>

                </div>
            <svg className="welcomeCircle">
                <ellipse id="welcomeCircle" rx="129" ry="125.5" cx="129" cy="125.5">
                </ellipse>
            </svg>
            <div id="welcomeMessage">
                <span>WELCOME<br/>TEMP_NAME!</span>
            </div>
            <img id="Settings" src={settingsIcon}/>
            <div id="settingsBtn">
                <button className="settingsBtn">Settings</button>
            </div>
            <div id="notesBtn">
                <button className="notesBtn">Notes</button>
            </div>
            <img id= "NotesIMG" src={notesIcon}/>
            <img id="Lessons" src={lessonIcon}/>
            <div id="lessonsBtn">
                <button className="lessonsBtn">Lessons</button>
            </div>
            <img id="Calendar" src={calendarIcon}/>
            <div id="calendarBtn">
                <button className="calendarBtn">Calendar</button>
            </div>

        </div>
        </body>
        )
    }

    export default App;