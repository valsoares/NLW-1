import React from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../itens/icones/logo.svg';
import seta from '../../itens/icones/arrow-left.svg';
import baterias from '../../itens/icones/baterias.svg';
import lampadas from '../../itens/icones/lampadas.svg';
import oleo from '../../itens/icones/oleo.svg';
import organicos from '../../itens/icones/organicos.svg';
import papeis from '../../itens/icones/papeis-papelao.svg';
import eletronicos from '../../itens/icones/eletronicos.svg';
import check from '../../itens/icones/check.svg';

import styles from './styles.module.css';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            cadastro: {
                name: '',
                endereço: '',
                número: '',
                estado: '',
                cidade: '',
                itens: ['','','','','','']
            },
            backgroundColor: ['#E2FFEC','#E2FFEC','#E2FFEC','#E2FFEC','#E2FFEC','#E2FFEC'],
            active: false,
            check: 'checkHidden',
            uf: '',
            loadeduf: false,        
            city: '',
            loadedcity: false  
        }

        this.handleClick = this.handleClick.bind(this);
        this.atualiza = this.atualiza.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.backHome = this.backHome.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleCity = this.handleCity.bind(this);
        
    }

    atualiza(tipo, active) {
        let material = this.state.cadastro.itens;

        if(active) {
            switch(tipo) {
                case 'lampada':
                    material[0] = 'Lâmpadas';
                    break;
                case 'bateria':
                    material[1] = 'Pilhas e Baterias';
                    break;
                case 'papel':
                    material[2] = 'Papéis e Papelão';
                    break;
                case 'eletronico':
                    material[3] = 'Resíduos Eletrônicos';
                    break;
                case 'organico':
                    material[4] = 'Resíduos Orgânicos';
                    break;
                case 'oleo':
                    material[5] = 'Óleo de Cozinha';
                    break;
                default:
                    console.log('erro');
            }
        }

        else {
            switch(tipo) {
                case 'lampada':
                    material[0] = '';
                    break;
                case 'bateria':
                    material[1] = '';
                    break;
                case 'papel':
                    material[2] = '';
                    break;
                case 'eletronico':
                    material[3] = '';
                    break;
                case 'organico':
                    material[4] = '';
                    break;
                case 'oleo':
                    material[5] = '';
                    break;
                default:
                    console.log('erro');
            }
        }

        this.setState(prevState => ({
            cadastro:{
              ...prevState.cadastro,
              itens: material
            }
          }));

    }

    handleClick(tipo, id) {
        let bg = this.state.backgroundColor[id];
        let aux = this.state.backgroundColor;

        switch(bg) {
            case '#E2FFEC':
                bg = 'rgba(65, 222, 125, 0.548)';
                this.atualiza(tipo, true);
                break;
            case 'rgba(65, 222, 125, 0.548)':
                bg = '#E2FFEC';
                this.atualiza(tipo, false);
                break;
            default:
                bg = '#E2FFEC';
        }
        aux[id] = bg;
        this.setState({backgroundColor: aux});
    }

    handleInput(event) {
        let item = event.target.name;
        let value = event.target.value;
        
        if(item == 'estado') {
            let id = event.target[event.target.selectedIndex].id;
            this.handleCity(id);
        }
        
        this.setState(prevState => ({
            cadastro:{
              ...prevState.cadastro,
              [item]: value
            }
          }));
    }

    handleOption(event) {
        let id = event.target.optionLabelProp;

        this.setState({ufid:id});

    }

    handleCheck() {
        let check = 'checkShow';
        this.setState({check:check});
    
    }

    backHome() {
        const { history } = this.props;
        setTimeout(() => history.push('/'), 2000);
    }

    async handleRegister(e) {
        e.preventDefault();
        let itens = JSON.parse(JSON.stringify(this.state.cadastro.itens));
        itens = itens.join(' ');
        let data = JSON.parse(JSON.stringify(this.state.cadastro));
        data.itens = itens;
        
        try {
            await api.post('coletas', data);   
            this.handleCheck();
            this.backHome();
        }
        catch(err) {
            alert('Ocorreu algum erro, tente novamente!');
        }

    }

    async componentWillMount() {
        const urluf = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
        await fetch(urluf).then(response => response.json()).then(data =>  this.setState({uf:data, loadeduf: true }));
        
    }

    async handleCity(id) {
        const urlcity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/distritos`;
        await fetch(urlcity).then(response => response.json()).then(data =>  this.setState({city:data, loadedcity: true }));
    }

    render() {
        
        return (
            <div className={styles.total}>

                <header>
                    <img src={logo} alt='logo' />
                    <Link to="/"><img src={seta} alt='seta' /> Voltar para home</Link>
                </header>

                <form onSubmit={this.handleRegister}>
                    <h1>Cadastro do ponto de coleta</h1>
                    <h3>Dados da entidade</h3>
                    <p>Nome da entidade</p>
                    <input required name={'name'} value={this.state.cadastro.name} onChange={this.handleInput}/>
                    <div className={styles.conjunto}>
                        <div className={styles.grupoend}>
                        <p>Endereço</p>
                        <input required name={'endereço'} value={this.state.cadastro.endereço} onChange={this.handleInput}/>

                        </div>
                        <div className={styles.gruponum}>
                        <p>Número</p>
                        <input required name={'número'} value={this.state.cadastro.número} onChange={this.handleInput}/>
                            
                        </div>
                    </div>
                    
                    <div className={styles.conjunto}>
                        <div className={styles.grupo}>
                        <p>Estado</p>
                        <select required name={'estado'} value={this.state.cadastro.estado} onChange={this.handleInput} autocomplete="off">
                            <option value="">Selecione o Estado</option>
                            {this.state.loadeduf &&
                            this.state.uf.map((text, index) => {
                                return <option id={text.id} key={index}>{text.nome}</option>
                            })
                            }

                        </select>
                            
                        </div>
                        <div className={styles.grupo}>
                        <p>Cidade</p>
                        <select required name={'cidade'} value={this.state.cadastro.cidade} onChange={this.handleInput} autocomplete="off">
                            <option value="">Selecione a Cidade</option>
                            {this.state.loadedcity &&
                            this.state.city.map((text, index) => {
                                return <option key={index}>{text.nome}</option>
                            })
                            }
                        </select>
                            
                        </div>
                    </div>
                    <div className={styles.conjunto}>
                        <h3>Itens de coleta</h3>
                        <p>Selecione um ou mais itens abaixo</p>
                    </div>
                    
                    <div className={styles.fotos}>
                        
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[0]}} onClick={ () => this.handleClick('lampada', 0)}>
                            <img src={lampadas} alt='lâmpadas' />
                            <figcaption>Lâmpadas</figcaption>
                        </div>
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[1]}} onClick={ () => this.handleClick('bateria', 1)}>
                            <img src={baterias} alt='baterias' />
                            <figcaption>Pilhas e Baterias</figcaption>

                        </div>
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[2]}} onClick={ () => this.handleClick('papel', 2)}>
                            <img src={papeis} alt='papeis' />
                            <figcaption>Papéis e Papelão</figcaption>

                        </div>
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[3]}} onClick={ () => this.handleClick('eletronico', 3)}>
                            <img src={eletronicos} alt='eletrônicos' />
                            <figcaption>Resíduos Eletrônicos</figcaption>

                        </div>
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[4]}} onClick={ () => this.handleClick('organico', 4)}>
                            <img src={organicos} alt='orgânicos' />
                            <figcaption>Resíduos Orgânicos</figcaption>
                        </div>
                        
                        <div className={styles.grupo} style={{backgroundColor: this.state.backgroundColor[5]}} onClick={ () => this.handleClick('oleo', 5)}>
                            <img src={oleo} alt='óleo' />
                            <figcaption>Óleo de Cozinha</figcaption> 
                        </div>

                    </div>

                    <button>Cadastrar ponto de coleta</button>

                </form>

                <div className={styles[this.state.check]}>
                    <img src={check} alt='check' />
                    <h1>Cadastro concluído!</h1>
                </div>
                
            </div>
        );
    }
}