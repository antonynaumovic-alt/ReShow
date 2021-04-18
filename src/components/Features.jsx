import React, { Component } from 'react';
import './Features.css';

function Features() {
    return (
        <>
        <div className="wrapper">
            <section className="bg-container">
                <div className="top-gradient"></div>
            </section>
        </div>
        <div className="features">
            <div className="leftBar"></div>
            <div className="features-container">
                <h1 className="features-title">Features</h1>
                <p className="features-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h2 className="features-subtitle">• Feature 1</h2>
                <p className="features-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                <h2 className="features-subtitle">• Feature 2</h2>
                <p className="features-body">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
                <h2 className="features-subtitle">• Feature 3</h2>
                <p className="features-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
        </div>
        </>
    )
}

export default Features;