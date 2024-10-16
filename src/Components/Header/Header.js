import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                logo
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search here..." />
                <button className="search-button">Q</button>
            </div>
            <div className="user-icon">
                <img src="path/to/user-icon.jpg" alt="User" />
            </div>
        </header>
    );
};

export default Header;