import React from 'react';
import PropTypes from 'prop-types';

import './input.module.scss';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {

    const inputType = props.type || 'text';
    const classFieldList = [ 'field' ];
    const classLabelList = [ 'label' ];
    const classInputList = [ 'input' ];
    const classErrorList = [ 'error' ];
    const id = `${inputType}-${Math.random()}`;


    if (isInvalid(props)) {
        classInputList.push('input_invalid');
    }

    return (
        <div className={classFieldList.join(' ')}>
            <label 
                className={classLabelList.join(' ')} 
                htmlFor={id}
            >{props.label}</label>
            <input 
                className={classInputList.join(' ')} 
                id={id} 
                type={inputType} 
                value={props.value}
                onChange={props.onChange}
                required={props.required}
            />
            {
                isInvalid(props) 
                ? <span
                  className={classErrorList.join(' ')} 
                  id={`error-${id}`}
                  >{props.error || 'Данные невалидны'}</span>
                : null
            }
            
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
}

export default Input;
