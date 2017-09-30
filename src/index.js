import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

/*
* AUTENTICAÇÃO
*
* Esse trecho de código está comentado pois ocorre problema no button go back do navegador
* Eg. Quando está na pagina /timeline/mateus e volta para /timeline, a página não volta.
*
* Acredito que isso ocorre por que o parametro {/mateus} está como opcional na rota.
* Para arrumar esse problema, tive que duplicar a rota, uma somenta com /timeline e outra
* com /timeline/:login
* Estou deixando o código comentando para exemplo e para o dia que eu encontrar uma solução
* melhor.
*/
/*
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {props => (
        localStorage.getItem('auth-token') === null && props.match.params.login === undefined ? (
            <Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />
        ) : (
            <Component {...props} />
            )
    )} />
)

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <AuthenticatedRoute path="/timeline/:login?" component={App} />
                <Route path="/Logout" component={Logout} />
            </Switch>
        </Router>
    ),
    document.getElementById('root')
);
*/
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('auth-token') ? (
            <Component {...props} />

        ) : (
                <Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />
            )
    )} />
)

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/timeline/:login" component={App} />
                <AuthenticatedRoute path="/timeline" component={App} />
            </Switch>
        </Router>
    ),
    document.getElementById('root')
);