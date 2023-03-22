<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {
    const content = <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
        <aside className='side-drawer' onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

=======
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {
    const content = <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
        <aside className='side-drawer' onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
export default SideDrawer;