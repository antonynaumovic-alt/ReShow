import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import { useHistory } from 'react-router-dom';
import ReactSession from 'react-client-session';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import logo from "./img/Enrolle.png";
import googleLogo from "./img/googleicon.png";
import twitterLogo from "./img/twittericon.png";
import facebookLogo from "./img/facebookicon.png";

import settingsIcon from './settings_icon.png';
import lessonIcon from './lesson_icon.png'
import calendarIcon from './calendar_icon.png'
import notesIcon from './notes_icon.png'

import { Button } from './Button';
import { GetContext } from '../contexts/UserAuth'

export default function Main(){

    const history = useHistory()
    const [error, setError] = useState("");
    const {currentUser, signout} = GetContext()
    

    async function handleSignout(){
        try{
            await signout();
            history.push("/");
        } 
        catch {
            setError('Account Logout Failed')
        }


    }

    return (
        <>
        { currentUser ?
            <div className="main">
            <div id="StudentMenu">
                <div className="currentUser">Logged in as: {currentUser && currentUser.email}</div>
                <div className="MenuFooter">
                <div id="logoutBtn">
                    <Button className="logoutBtn" onClick={handleSignout}>Log Out</Button>
                </div>

                <div id="accountBtn">
                    <Button className="accountBtn">Account</Button>
                </div>
                </div>
                <div id="Level_1">
                        <div id="NotesBtn">
                            <Button className= "NotesBtn" linkTo="/main/notes">Notes</Button>
                        </div>
                        <div id="Homework">
                            <Button className="HomeworkBtn" linkTo="/main/homework">Homework</Button>
                        </div>
                        <div id="RoomsBtn">
                            <Button className="RoomsBtn" linkTo="/main/rooms">Rooms</Button>
                        </div>
                        <div id="GradesBtn">
                            <Button className="GradesBtn" linkTo="/main/grades">Grades</Button>
                        </div>
                        <div id="ScheduleBtn">
                            <Button className="ScheduleBtn" linkTo="/main/schedule">Schedule</Button>
                        </div>
                        <div id="ModulesBtn">
                            <Button className="ModulesBtn" linkTo="/main/modules">Modules</Button>
                        </div>
                        <div id="Announcements">
                            <Button className="AnnouncementsBtn" linkTo="/main/announcements">Announcements</Button>
                        </div>
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
            </div>
        : 
        history.push("/login")
        }
        </>
    )
}

