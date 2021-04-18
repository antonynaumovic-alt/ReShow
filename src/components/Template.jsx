import React, { Component } from 'react'
import './Template.css';
import './Footer.css';
import Footer from './Footer';

function Template() {

        return (
            <>
            <div className="Template">
                <div className="Template-container">
                    <h1 className="Template-title">Template</h1>
                    <p className="Template-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h2 className="Template-subtitle">• Template 1</h2>
                    <p className="Template-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                    <h2 className="Template-subtitle">• Template 2</h2>
                    <p className="Template-body">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
                    <h2 className="Template-subtitle">• Template 3</h2>
                    <p className="Template-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>
            <div className="FooterContainerContact">
            <Footer className="Footer-contact"/>
            </div>
            

            </>
        )
}

export default Template