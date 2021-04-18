import React, { Component } from 'react'
import './Footer.css';

function Footer(){
    return (
        <>
            <div className="Footer">
                <div className="Footer-Container">
                    <h2 className="Link-Header">Key Links</h2>
                    <a className="Link" href="/">Home</a>
                    <a className="Link" href="/features">Features</a>
                    <a className="Link" href="/mission">Mission</a>
                    <a className="Link" href="/application">Application</a>
                    <a className="Link" href="/why">Why Us?</a>
                    <a className="Link" href="/implementations">Implementations</a>
                    <a className="Link" href="/faq">FAQ</a>
                </div>
                <div className="Footer-Container-2">
                    <h2 className="Link-Header">Students Links</h2>
                    <a className="Link" href="/students">Student Hub</a>
                    <a className="Link" href="/mission">Homework</a>
                    <a className="Link" href="/application">Calendar</a>
                </div>
            </div>
        </>
    )

}

export default Footer
