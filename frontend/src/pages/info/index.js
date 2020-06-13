import React from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../itens/icones/logo.svg';
import seta from '../../itens/icones/arrow-left.svg';

import styles from './styles.module.css';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cidade: this.props.location.cidade,
            data: '',
            loadeddata: false,
            filtro: '',
            count: ''
        }

        this.handleFiltro = this.handleFiltro.bind(this);
    }

    async componentWillMount() {
        
        try {
            
            await api.get('coletas').then(response => {this.setState({data:response.data})});   
            this.handleFiltro(this.state.data);
        }
        catch(err) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }

    async handleFiltro(data) {
        const cidade = this.state.cidade;
        let filtro = this.state.filtro;
        filtro = await data.filter(nome => (nome.cidade.includes(cidade)) );
        let count = filtro.length;
        this.setState({filtro:filtro, loadeddata: true, count:count}); 
    }

    render() {

        return(
            <div className={styles.total}>
                <header>
                    <img src={logo} alt='logo' />
                    <Link to="/"><img src={seta} alt='seta' /> Voltar para home</Link>
                </header>
                <div className={styles.conteudo}>
                    <p><b>{this.state.count} pontos</b> de coleta.</p>
                    <div className={styles.conjunto}>
                        {this.state.loadeddata &&
                            this.state.filtro.map((text, index) => {
                                return (
                                <div className={styles.itens} key={index}>
                                    <h3>{text.name}</h3>
                                    <h4>{text.itens}</h4>
                                    <p>{text.cidade}, {text.estado}</p>
                                    <p>{text.endereço}, {text.número}</p>
                                </div>
                                )
                            })
                        }

                    </div>
                </div>
                    <div className={styles.page}>
                        <img src={seta} alt='seta' />
                        <img src={seta} alt='seta' style={{transform: 'rotate(180deg)'}} />
                    </div>

            </div>
        );
    }
}