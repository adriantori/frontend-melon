<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}

        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className='main-navigation__drawer-nav'>
                <NavLinks />
            </nav>
        </SideDrawer>

        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">Check-up Melon</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
        </React.Fragment>
    );
};

=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}

        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className='main-navigation__drawer-nav'>
                <NavLinks />
            </nav>
        </SideDrawer>

        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">Check-up Melon</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
        </React.Fragment>
    );
};

>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
export default MainNavigation;