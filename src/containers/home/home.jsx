import React, { Component } from 'react';
import './home.module.scss';

class Home extends Component {
    state = {
        title: 'Список пользователей',
        adminTitle: 'Администраторы',
        userTitle: 'Пользователи',
        allUsersTitle: 'Всего пользователей',
        allUserCounter: 0,
        adminUserCounter: 0,
        simpleUserCounter: 0,
    }

    componentDidMount() {
        this.userCounter();
    }

    userCounter() {
        const userList = JSON.parse(localStorage.getItem('userList'));
        const allUserList = userList.length;

        const simpleUserList = userList.filter(el => {
            return el.roleKey === 'user';
        }).length;

        const adminUserList = userList.filter(el => {
            return el.roleKey === 'admin';
        }).length;

        this.setState({
            allUserCounter: allUserList,
            adminUserCounter: adminUserList,
            simpleUserCounter: simpleUserList,
        })
    }

    render() {

        return (
            <section className='home'>
                <h2>{this.state.title}</h2>

                <p className='text'>
                    {this.state.adminTitle} {this.state.adminUserCounter}
                </p>

                <p className='text'>
                    {this.state.userTitle} {this.state.simpleUserCounter}
                </p>

                <p className='text'>
                    {this.state.allUsersTitle} {this.state.allUserCounter}
                </p>

                <a className='button' href='/users'>Пользователи</a>
            </section>
        )
    }
}

export default Home;