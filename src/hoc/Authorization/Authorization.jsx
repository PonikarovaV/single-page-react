import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './authorization.module.scss';

import Input from '../../components/input/Input.jsx';
import { api } from '../../scripts/Api.jsx';


class Authorization extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                params: {
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    error: 'Допускаются символы a-z, а-я, 0-9 в любом регистре (количество от 2 до 30)',
                    valid: false,
                    touched: false,
                },
                validation: {
                    required: true,
                }

            },
            password: {
                params: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    error: 'Допускаются символы *, a-z, 0-9 в любом регистре (количество от 5 до 15)',
                    valid: false,
                    touched: false,
                },
                validation: {
                    required: true,
                }
            },
        }
    }

    submitHandler() {
        event.preventDefault();

        const authData = {
            login: this.state.formControls.email.params.value,
            password: this.state.formControls.password.params.value,
        }

        api.login(authData)
            .then(res => {
                localStorage.setItem('hash', JSON.stringify(res.data.userHash));
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .then(() => {
                api.getList()
                    .then(res => {
                        localStorage.setItem('userList', JSON.stringify(res.data.summary));
                    })
                    .catch(err => console.error(err));
            })
            .then(() => {
                api.getUserListWithNames()
                    .then(res => {
                        localStorage.setItem('userListWithNames', JSON.stringify(res.data));
                    })
                    .catch((err) => console.error(err));
            })
            .then(() => {
                setTimeout(() => {
                    this.props.handleAuthState();
                }, 100);
            })
            .catch(err => console.error(err));
    }

    validateControl(value, type, params) {
        if (!params) {
            return true;
        }

        let isValid = true;

        if (params.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (type === 'text') {
            const regexp = /^[a-zA-Zа-яёА-ЯЁ0-9]{2,30}$/gi;
            isValid = regexp.test(value) && isValid;
        }

        if (type === 'password') {
            const regexp = /^[a-zA-Z0-9*]{5,15}$/gi;
            isValid = regexp.test(value) && isValid;
        }

        return isValid;
    }

    onChangeHandler(event, name) {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[name].params };
        const validation = { ...formControls[name].validation };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.type, validation);

        formControls[name].params = control;
        
        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].params.valid && isFormValid;
        });

        this.setState({
            control, isFormValid 
        });
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const params = this.state.formControls[controlName].params;
            const validation = this.state.formControls[controlName].validation;

            return (
                <Input
                key={controlName + index}
                type={params.type}
                value={params.value}
                valid={params.valid}
                touched={params.touched}
                label={params.label}
                shouldValidate={!!validation}
                error={params.error}
                onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        const classButtonList = [ 'form__button' ];

        if (this.state.isFormValid) {
            classButtonList.push('form__button_activ');
        }

        return (
            <section className='authorization'>
                <form className='form' onSubmit={this.submitHandler.bind(this)}>
                    {this.renderInputs()}

                    <button 
                        onClick={this.submitHandler.bind(this)} 
                        className={classButtonList.join(' ')} 
                        type='submit' 
                        disabled={!this.state.isFormValid}
                    >Войти</button>
                </form>
            </section>
        )
    }
}

Authorization.propTypes = {
    handleAuthState: PropTypes.func
}

export default Authorization;