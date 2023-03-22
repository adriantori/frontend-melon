import React, { useContext }from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>Menu Utama</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/plants">Info Tanaman</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/addPlant">Tambah Tanaman</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">Login/Register</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>Log-out</button>
            </li>
        )}
    </ul>
};

export default NavLinks;