import React, { Component } from 'react';
import './navigation.module.scss';

import Link from '../link/link.jsx';

class Navigation extends Component {
    state = {
        links: [
            {
                name: 'Сводка',
                href: '/',
            },
            {
                name: 'Пользователи',
                href: '/users',
            },
        ]
    }

    render() {
        const links = this.state.links.map((link, index) => {
            return (
                <Link 
                key={index}
                index={index}
                href={link.href}
                name={link.name}
                />
            )
        });

        return (
            <React.Fragment>
                <ul className='navigation'>
                    {links}
                </ul>
            </React.Fragment>
        )
    }
}

export default Navigation;
