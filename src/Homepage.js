import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

 const Homepage = () => {
    return (
        <div id="homepage-container">
            <h1 id="title"> Welcome to the Flashcard App </h1>
            <p id="description">Select an option below:</p>
            <div id="links">
                <Link to="/editor" className='link'>Go to Card Editor</Link>
                <Link to="/viewer" className='link'>Go to Card Viewer</Link>
            </div>
        </div>
    )
 }

export default Homepage;