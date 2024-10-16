import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Users', path: '/users' },
        { name: 'Reports', path: '/reports' },
        { name: 'Notifications', path: '/notifications' }
    ];

    return (
        <aside className="sidebar">
            <div className="logo">
            </div>
            <ul className="menu">
                {menuItems.map((item, index) => (
                    <li key={index} onClick={() => navigate(item.path)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
