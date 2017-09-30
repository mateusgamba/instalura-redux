import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {

    /* Antes de chamar o render */
    componentWillMount() {
        localStorage.removeItem('auth-token');
    }

    render() {
        return <Redirect to='./' />;
    }
}