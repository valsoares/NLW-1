import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../itens/icones/logo.svg';
import login from '../../itens/icones/log-in.svg';
import search from '../../itens/icones/search.svg';
import logomaior from '../../itens/icones/home-background.svg';
import xis from '../../itens/icones/x.svg';

import styles from './styles.module.css';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            coleta: 'coletaHidden',
            estado: '',
            uf: '',
            loadeduf: false, 
            cidade: '',
            city: '',
            loadedcity: false 
        }

        this.showColeta = this.showColeta.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showColeta() {
        let coleta = (this.state.coleta == 'coletaHidden') ? 'coletaShow' : 'coletaHidden';
        this.setState({coleta:coleta});
    }

    handleSelect(event) {
        let item = event.target.name;
        let value = event.target.value;
        let id = event.target[event.target.selectedIndex].id;

        if(item == 'estado') {
            this.handleCity(id);
        }

        this.setState({[item]:value});
    }

    async componentWillMount() {
        const urluf = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
        await fetch(urluf).then(response => response.json()).then(data =>  this.setState({uf:data, loadeduf: true }));
        
    }

    async handleCity(id) {
        const urlcity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/distritos`;
        await fetch(urlcity).then(response => response.json()).then(data =>  this.setState({city:data, loadedcity: true }));
    }

    handleSubmit() {
        
        this.props.history.push({
            pathname: '/info',
            cidade:this.state.cidade
          })
    }

    render() {
        return(
            <div className="total">
                <header>
                    <img src={logo} alt='logo' />
                    <Link to="/register"><img src={login} alt='login' /> Cadastre um ponto de coleta.</Link>
                </header>
                <div className="conteudo">
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <button onClick={this.showColeta}><img src={search} alt='procura' />Pesquisar pontos de coleta</button>
                </div>
                <div className="logomaior">
                    <img src={logomaior} alt='logo' />
                </div>

                <div className={styles[this.state.coleta]}>
                    <form onSubmit={this.handleSubmit}>
                        <img src={xis} onClick={this.showColeta} alt='fecha' />
                        <h1>Pontos de Coleta</h1>
                        <select required name={'estado'} value={this.state.estado} onChange={this.handleSelect}>
                            <option value="">Selecione o Estado</option>
                            {this.state.loadeduf &&
                                this.state.uf.map((text, index) => {
                                    return <option id={text.id} key={index}>{text.nome}</option>
                                })
                            }
                        </select>
                        <select required name={'cidade'} value={this.state.cidade} onChange={this.handleSelect}>
                            <option value="">Selecione o Cidade</option>
                            {this.state.loadedcity &&
                                this.state.city.map((text, index) => {
                                    return <option key={index}>{text.nome}</option>
                                })
                            }
                        </select>

                        <button type="submit" >Buscar</button>
                    </form>
                </div>
            </div>
        );
    }
}