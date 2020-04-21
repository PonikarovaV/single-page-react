import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './link.module.scss';

class Link extends Component {
    render() {
        return (
            <React.Fragment>
                <li className='navigation__item'>
                    <a className='navigation__link' href={this.props.href}>
                        {this.props.name}
                    </a>
                </li>
            </React.Fragment>
        )
    }
}

Link.propTypes = {
    href: PropTypes.string,
    name: PropTypes.string,
}

export default Link;
