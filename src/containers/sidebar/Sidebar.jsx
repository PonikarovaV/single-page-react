import React, { Component } from 'react';
import './sidebar.module.scss';

import Navigation from '../../components/navigation/navigation.jsx';

class Sidebar extends Component {
    render() {
        return (
            <section className='sidebar'>
                <Navigation/>
            </section>
        )
    }
}

export default Sidebar;
