
import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const styles = ['btn--outline'];
const sizes = ['btn--small', 'btn--large'];
const redirects = ['/']

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  linkTo

}) => {
  const verifyStyle = styles.includes(buttonStyle) ? buttonStyle : styles[0];
  const verifySize = sizes.includes(buttonSize) ? buttonSize : sizes[0];
  const verifyLink = redirects != null ? linkTo : redirects[0];


  return (
    <Link to={verifyLink} className='btn-desktop'>
      <button className={`btn ${verifyStyle} ${verifySize}`} onClick={onClick} type={type} >
        {children}
      </button>
    </Link>
  );
};
