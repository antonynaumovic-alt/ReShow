import React, { Component } from 'react'
import './Contact.css';
import './Footer.css';
import Footer from './Footer';

function Contact() {

        return (
            <>
            <div className="Contact">
                <div className="Contact-container">
                    <div className="Creators">
                        <h1 className="Contact-title">Creators</h1>
                        <a href="mailto:Person@example.com" className="Contact-Person">Person 1</a>
                        <div className="PersonImage"></div>
                        <a href="mailto:Person@example.com" className="Contact-Person">Person 2</a>
                        <div className="PersonImage"></div>
                        <a href="mailto:Person@example.com" className="Contact-Person">Person 3</a>
                        <div className="PersonImage"></div>
                        <a href="mailto:Person@example.com" className="Contact-Person">Person 4</a>
                        <div className="PersonImage"></div>
                        <a href="mailto:Person@example.com" className="Contact-Person">Person 5</a>
                        <div className="PersonImage"></div>
                    </div>
                </div>
            </div>
            <div className="FooterContainerContact">
            <Footer className="Footer-contact"/>
            </div>
            

            </>
        )
}

export default Contact