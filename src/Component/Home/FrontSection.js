import React from 'react';
import {Button} from './Button';
import {Button1} from './Button1';
import './FrontSection.css';
import { useState, useEffect } from 'react';

function FrontSection() {

    const role = localStorage.getItem('roles')
    const [crole, setRole] = useState(null)
    
    useEffect(() => {
        setRole(role)
      }, [])

    return (
        <div className='front-container'>

            <h1>FUTURE AWAITS</h1>
            <p>What are you waiting for?</p>

            {(crole === null ) ?
            <div className="front-btns">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>

                <Button1 className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>LOG IN</Button1>
            </div>
            : ""}

        </div>
        
    )
}

export default FrontSection;
