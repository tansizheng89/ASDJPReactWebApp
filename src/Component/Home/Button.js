import React from 'react';
import './Button.css'
import {Link} from 'react-router-dom'

const STYLES = ['btn--primary' , 'btn--outline']

const SIZES = ['btn -- medium', 'btn--large']

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize  
}) => {
    //if the current component containt the buttonstyle
    //if true- will be the style created. if not, default is primary
    const checkButtonStyle = STYLES.includes(buttonStyle) 
    ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize: SIZES[0]

    return (
        //pass button rendering to display
        <Link to='/CreateUser' className='btn-mobile'>
            <button 
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onclick}
            type={type}>
                {children} 
            </button>
        </Link>

        
    )
};
