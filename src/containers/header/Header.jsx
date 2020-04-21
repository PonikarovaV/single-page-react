import React, { Component } from 'react';
import './header.module.scss';

import Title from '../../components/headerTitle/Title.jsx';

class Header extends Component {
    state = {
        title: 'Страница пользователя',
    }

    componentDidMount() {
        this.getUserName();
    }

    getUserName() {
        const userInfo = JSON.parse(localStorage.getItem('user')) || {};

        const userName = `${userInfo.name} ${userInfo.surname}`; 

        this.setState({
            title: userName
        });
    }

    render() {
        return (
            <header className='header'>
                <Title
                title={this.state.title}
                />
            </header>
        )
    }
}

export default Header;
