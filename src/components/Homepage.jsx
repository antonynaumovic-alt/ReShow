import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import EnrolleLogo from './Enrolle.png';
import './Homepage.css';

import Footer from './Footer';
import './Footer.css';

function Homepage() {
    return (
        <div className="homepage">
            <div className="wrapper">
                <section className="bg-container">
                    <div className="top-gradient"></div>
                    <div className="bottom-gradient"></div>
                    <div className="bg-image"></div>
                </section>
                <div className="section-divider divider1"></div>
                <section className="features-homepage">
                    <span className="bg-circle" ></span>
                    <div className="bg-image-features"></div>
                    <div className="text-container">
                        <h1 className="text-title">Current Features</h1>
                        <p className="text-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
At vero eos et accusam et justo duo
                        </p>
                        <div className="btn-container">
                            <Button className="btn-textbox"buttonStyle="btn--outline" linkTo="/features">Learn More</Button>
                        </div>
                    </div>
                </section>
                <div className="section-divider divider2"></div>
                <section className="mission-homepage">
                    <span className="bg-circle-alt" ></span>
                    <div className="bg-image-features"></div>
                    <div className="text-container-alt">
                        <h1 className="text-title-alt">Why Choose Us?</h1>
                        <p className="text-body-alt">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
At vero eos et accusam et justo duo
                        </p>
                        <div className="btn-container-alt">
                            <Button className="btn-textbox" buttonStyle="btn--outline" linkTo="/why">Learn More</Button>
                        </div>
                    </div>
                </section>
                <div className="section-divider divider3"></div>
            </div>
            <div className="FooterContainer">
                <Footer/>
            </div>
        </div>
    )
}

export default Homepage;
