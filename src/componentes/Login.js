import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);

        /* Carrega mensagens */
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const msg = params.get('msg');
        this.state = { msg: msg, redirectToReferrer: false };
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ login: this.login.value, senha: this.senha.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('não foi possivel fazer login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.setState({ redirectToReferrer: true })

            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
    }

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (<Redirect to='./timeline' />)
        }

        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}