import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './button.module.scss';

import { ValidForm } from '../../containers/popup/Popup.jsx';

class Button extends Component {
    render() {
        return (
            <React.Fragment>
                <ValidForm.Consumer>
                    {() => {
                        if (ValidForm._currentValue === true) {
                            return (<p style={{color: 'white', margin: '10px auto 0'}}>OK</p>)
                        }
                    }}
                </ValidForm.Consumer>
                <button 
                className='button' 
                id={this.props.id}
                onClick={this.props.onClick}
                >
                {this.props.name}
                </button>
            </React.Fragment>
            
        )
    }
}

Button.propTypes = {
    id: PropTypes.object,
    name: PropTypes.object,
    onClick: PropTypes.func,
}

export default Button;
