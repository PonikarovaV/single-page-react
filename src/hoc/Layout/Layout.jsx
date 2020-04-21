import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './layout.module.scss';

import Sidebar from '../../containers/sidebar/Sidebar.jsx';
import Header from '../../containers/header/Header.jsx';
import Home from '../../containers/home/home.jsx';
import Users from '../../containers/users/Users.jsx';

class Layout extends Component {
    state = {
        activePage: Home,
    }

    render() {
        return (
            <div className='layout'>
                <Header />

                <main className='main'>
                    <Sidebar />

                    <Route path='/' exact component={Home} />
                    <Route path='/users' exact component={Users} />
                </main>
            </div>
        )
    }
}

export default Layout;
