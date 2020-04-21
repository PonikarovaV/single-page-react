import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './title.module.scss';

class Title extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 className='header__username'>{this.props.title}</h1>
            </React.Fragment>
        )
    }
}

Title.propTypes = {
    title: PropTypes.string,
}

export default Title;
