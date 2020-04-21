import React from 'react';
import PropTypes from 'prop-types';

import './userLine.module.scss';

const UserLine = (props) => {

    return (
        <div className='line'>
            <p className='line__role'>{props.role}</p>
            <p className='line__name'>{props.name}</p>
            <button className='line__button' onClick={props.updateUser}>📝</button>
            <button className='line__button' onClick={props.deleteUser}>🗑</button>
        </div>
    )
}

UserLine.propTypes = {
    role: PropTypes.string,
    name: PropTypes.string,
    updateUser:  PropTypes.func,
    deleteUser: PropTypes.func,
}

export default UserLine;
