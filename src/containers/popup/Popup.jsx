import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './popup.module.scss';

import Input from '../../components/input/Input.jsx';
import Button from '../../components/button/Button.jsx';

const ValidForm = React.createContext(false);

class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSettings: this.props.formSettings,
        }
    }

    validateControl = (value, type, params) => {
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

        return isValid;
    }

    handleChange = (event, input) => {
        const formControls = { ...this.state.formSettings };
        const control = { ...formControls[input].params };
        const validation = { ...formControls[input].validation };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.type, validation);

        formControls[input].params = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].params.valid && isFormValid;
        });

        this.setState({
            control, isFormValid 
        });
    }

    handleSubmit = () => {
        event.preventDefault();

        const userData = {
            role: this.state.formSettings.role.params.value,
            name: this.state.formSettings.name.params.value,
            surname: this.state.formSettings.surname.params.value,
        }

        this.props.submit(userData);
    }

    renderInputs() {
        return Object.keys(this.state.formSettings).map((input, index) => {
            const params = this.state.formSettings[input].params;
            const validation = this.state.formSettings[input].validation;

            return (
                <Input
                key={input + index}
                type={params.type}
                value={params.value}
                valid={params.valid}
                touched={params.touched}
                label={params.label}
                shouldValidate={!!validation}
                error={params.error}
                onChange={(event) => this.handleChange(event, input)}
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
            <section className='popup'>
                {this.props.render()}
                <form className='form' onSubmit={this.handleSubmit.bind(this)}>
                    {this.renderInputs()}

                    <button 
                        onClick={this.handleSubmit.bind(this)} 
                        className={classButtonList.join(' ')} 
                        type='submit' 
                        disabled={!this.state.isFormValid}
                    >Отправить</button>
                </form>
                
                <ValidForm.Provider value={this.state.isFormValid}>
                    <Button
                        id='hidePopup'
                        name='Отмена'
                        onClick={this.props.hidePopup}
                    />
                </ValidForm.Provider>
            </section>
        )
    }
}

Popup.propTypes = {
    formSettings: PropTypes.object,
    hidePopup: PropTypes.func,
    render:  PropTypes.func,
    submit: PropTypes.func,
}

export { Popup, ValidForm };
