import React, { Component } from 'react';

import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.jsx';
import Layout from '../hoc/Layout/Layout.jsx';
import Authorization from '../hoc/Authorization/Authorization.jsx';


class App extends Component {
    state = {
        authState: false
    }

    componentDidMount() {
        this.handleAuthState();
    }

    handleAuthState() {
        const userHash = JSON.parse(localStorage.getItem('hash')) || null;

        if (userHash !== null) {
            this.setState({
                authState: true
            });
        } else {
            this.setState({
                authState: false
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.authState 
                ? <ErrorBoundary>
                    <Layout />
                  </ErrorBoundary>
                : <ErrorBoundary>
                    <Authorization 
                        handleAuthState={this.handleAuthState.bind(this)} 
                    />
                  </ErrorBoundary>
                }
            </React.Fragment>
        );
    }
}

export default App;
