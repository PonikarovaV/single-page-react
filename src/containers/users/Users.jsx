import React, { Component } from 'react';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary.jsx';

import './users.module.scss';

import Button from '../../components/button/Button.jsx';
import UserLine from '../../components/userLine/userLine.jsx';
import { Popup } from '../popup/Popup.jsx';
import { api } from '../../scripts/Api.jsx';


class Users extends Component {
    state = {
        title: {
            text: 'Список пользователей',
        },
        subtitle: {
            text: 'Основная информация',
        },
        buttons: {
            save: {
                name: 'Добавить',
                attributes: {
                    id: 'save'
                },
            },
            edit: {
                name: 'Редактировать',
                attributes: {
                    id: 'edit'
                },
            }
        },
        formControls: {
            role: {
                params: {
                    value: '',
                    type: 'text',
                    label: 'Роль',
                    error: 'Допускаются символы a-z, а-я, 0-9 в любом регистре (количество от 2 до 30)',
                    valid: false,
                    touched: false,
                },
                validation: {
                    required: true,
                }
            },
            name: {
                params: {
                    value: '',
                    type: 'text',
                    label: 'Имя',
                    error: 'Допускаются символы a-z, а-я, 0-9 в любом регистре (количество от 2 до 30)',
                    valid: false,
                    touched: false,
                },
                validation: {
                    required: true,
                }
            },
            surname: {
                params: {
                    value: '',
                    type: 'text',
                    label: 'Фамилия',
                    error: 'Допускаются символы a-z, а-я, 0-9 в любом регистре (количество от 2 до 30)',
                    valid: false,
                    touched: false,
                },
                validation: {
                    required: true,
                }
            },
        },
        users: [],
        userData: {},
        showPopup: false,
        typePopup: () => {},
        userIdForUpdate: ''
    };

    componentDidMount() {
        this.getUserList();
    }

    getUserInfo() {
        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
          id: user.id,
          userHash: user.userHash,
          login: user.login,
          password: 12345,
        };

        return data;
    }

    getUserList() {
        const userList = JSON.parse(localStorage.getItem('userListWithNames'));


        const userListData = [
            {
                role: userList.admin.roleList.roleName,
                name: `${userList.admin.name}`,
                surname:  `${userList.admin.surname}`
            },
            {
                role: userList.user.roleList.roleName,
                name: `${userList.user.name}`,
                surname:  `${userList.user.surname}`,
            },
        ]

        userListData.forEach((user, index) => {
            user.id = 'user' + index;
        });

        this.setState({
            users: userListData
        });
    }

    deleteUser(id) {
        const data = this.getUserInfo();

        let users = this.state.users.concat();

        const userForDelete = users.find((user) => {
            return user.id === id;
        });

        data.roleId = userForDelete.role;
        data.name = userForDelete.name;
        data.surname = userForDelete.surname;

        api.deleteMember(data)
            .then(() => {
                const newUserList = users.filter((user) => {
                    return user.id !== id;
                });

                this.setState({
                    users: newUserList
                });
            })
            .catch((err) => console.error(err));
    }

    addNewUser(value) {
        const data = this.getUserInfo();

        let users = this.state.users.concat();

        data.roleId = value.role;
        data.name = value.name;
        data.surname = value.surname;

        api.addNewMember(data)
            .then(() => {
                const newUser = {
                    role: data.roleId,
                    name: `${data.name}`,
                    surname:  `${data.surname}`
                }

                users.push(newUser);

                users.forEach((user, index) => {
                    user.id = 'user' + index;
                });
                
                this.setState({
                    users
                });
            })
            .catch((err) => console.error(err))
            .finally(() => {
                this.setState({
                    showPopup: false
                });
            });
    }

    updateUser(value) {
        const data = this.getUserInfo();

        let users = this.state.users.concat();

        data.roleId = value.role;
        data.name = value.name;
        data.surname = value.surname;

        api.saveNewProfile(data)
        .then(() => {
            const newUserInfo = {
                role: data.roleId,
                name: `${data.name}`,
                surname:  `${data.surname}`,
                id: this.state.userIdForUpdate,
            }

            let newUserList = users.map((user) => {
                if (user.id === this.state.userIdForUpdate) {
                    user = newUserInfo;
                }

                return user;
            });
            
            this.setState({
                users: newUserList
            });
        })
        .catch((err) => console.error(err))
        .finally(() => {
            this.setState({
                showPopup: false
            });
        });
    }

    showPopup(button) {
        if (button.name === 'addUserButton') {
            this.setState({
                typePopup: this.addNewUser.bind(this),
            });
        }

        if (button.name === 'editUserButton') {
            this.setState({
                typePopup: this.updateUser.bind(this),
                userIdForUpdate: button.id
            });
        }

        this.setState({
            showPopup: true,
        });
    }

    hidePopup() {
        this.setState({
            showPopup: false,
        });
    }

    setUserList() {
        return this.state.users.map((user) => {
            const id = user.id

            return (
                <ErrorBoundary key={id}>
                    <UserLine 
                    role={user.role}
                    name={`${user.name} ${user.surname}`}
                    deleteUser={this.deleteUser.bind(this, id)}
                    updateUser={this.showPopup.bind(this, { name: 'editUserButton', id })}
                    />
                </ErrorBoundary>
            )
        });
    }

    render() {
        return (
            <section className='users'>
                <h2 className='title'>{this.state.title.text}</h2>
                <p className='subtitle'>{this.state.subtitle.text}</p>

                {this.setUserList()}

                <Button
                id={this.state.buttons.save.attributes.id}
                name={this.state.buttons.save.name}
                onClick={this.showPopup.bind(this, { name: 'addUserButton' })}
                />

                {this.state.showPopup 
                ? <Popup 
                   render={() => ( <h2 style={{color: 'white', fontSize: '24px'}}>Введите данные</h2> ) }
                   formSettings={this.state.formControls}
                   submit={this.state.typePopup} 
                   hidePopup={this.hidePopup.bind(this)}
                   />
                : null
                }

            </section>
        )
    }
}

export default Users;
