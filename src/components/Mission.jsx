import React, { Component } from 'react';
import './Mission.css';

function Mission() {
    return (
        <>
        <div className="wrapper">
            <section className="bg-container">
                <div className="top-gradient"></div>
            </section>
        </div>
        <div className="mission">
            <div className="leftBar"></div>
            <div className="mission-container">
                <h1 className="mission-title">Our Mission</h1>
                <h2 className="mission-subtitle">• Mission 1</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                <h2 className="mission-subtitle">• Mission 2</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
                <h2 className="mission-subtitle">• Mission 3</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <h2 className="mission-subtitle">• Mission 4</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                <h2 className="mission-subtitle">• Mission 5</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing </p>
                <h2 className="mission-subtitle">• Mission 6</h2>
                <p className="mission-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
        </div>
        </>
    )
}

export default Mission;