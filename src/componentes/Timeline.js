import React, { Component } from 'react';
import FotoItem from './FotoItem';
import { CSSTransitionGroup } from 'react-transition-group';
import TimelineApi from '../logicas/TimelineApi';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    /*
    * componentWillMount
    * É chamado antes de invocar o Render
    */
    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ fotos: this.props.store.getState() });
        })
    }

    carregaFotos() {
        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }
        this.props.store.dispatch(TimelineApi.lista(urlPerfil));

    }

    /*
    * componentDidMount
    * É chamado depois de invocar o Render
    */
    componentDidMount() {
        this.carregaFotos();
    }

    /*
    * Renderiza com novas propriedades
    * componentWillReceiveProps() is invoked before a mounted component receives new props.
    */
    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
    }

    comenta(fotoId, textoComentario) {
        this.props.store.dispatch(TimelineApi.comenta(fotoId, textoComentario));
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)} />)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default Timeline;