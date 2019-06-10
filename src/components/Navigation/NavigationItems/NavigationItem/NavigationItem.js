import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink
            exact
            to={props.link}
            className={props.active ? classes.active : null}
            >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;