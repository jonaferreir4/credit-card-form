import './form.css'
import React, { Component } from "react"
import Card from './card'

import amexImg from '../assets/imgs/amex.png';
import mastercardImg from '../assets/imgs/mastercard.png';
import visaImg from '../assets/imgs/visa.png';
import discoverImg from '../assets/imgs/discover.png';

    const initialState = {
        card: {
            cardType: '',
            cardNumber: '**** **** **** ****',
            cardHolder: 'Jona F Sousa',
            expires: 'MM/YY',
            cvv: ''
           

        },
        list: [],
        cardFlipped: false,
        month: '', 
        year: ''
    }

    export default class Form extends Component {
            state = { ...initialState }
            

        optionsCardTypes(number) {
            const visa = 4, mastercard1 = 5, mastercard2 = 2,
            discover = 6, americanExprex = 3
            const card = { ...this.state.card }
            switch(number) {
                case americanExprex:
                    card.cardType = amexImg
                    this.setState({ card })
                break
                case mastercard1:
                case mastercard2:
                    card.cardType = mastercardImg
                    this.setState({ card })
                break
                case visa:
                    card.cardType = visaImg
                    this.setState({ card })
                break
                case discover:
                    card.cardType = discoverImg
                    this.setState({ card })
                   
                break
                default:
                    card.cardType = ''
                    this.setState({ card })
                break;

                
            }
        }
        
        handleCardTypeChange(number) {
            const firstNumber  =  parseInt(number[0])
            
            if(!isNaN(firstNumber)){
                
               this.optionsCardTypes(firstNumber)
            } else {
                const card = { ...this.state.card }
                card.cardType = ''
                this.setState({ card })
            }
        }

        handleCardNumberChange(event) {
            let number = event.target.value;
            const sanitizedNumber = number.replace(/\s/g, ''); // Remover espaços extras
            const formattedNumber = sanitizedNumber.replace(/(\d{4})/g, '$1 ')

            // Atualiza o estado do componente com o novo número do cartão  
            this.setState(prevState => ({
                card: {
                    ...prevState.card,
                    cardNumber: formattedNumber !== '' ? formattedNumber : initialState.card.cardNumber
                }
            }), () => {
                // Após atualizar o estado, chama a função para determinar o tipo do cartão
                this.handleCardTypeChange(number);
            });
        
        }

        handleCardHolderChange(event) {
            const holder = event.target.value;
            this.setState({
                card: {
                    ...this.state.card,
                    cardHolder: holder
                }
            });
        }

        handleCardCVCChange(event) {
            const cvv = event.target.value;
            const card = { ...this.state.card }
            this.setState({
                card: {
                    ...card,
                    cvv: cvv

                }
            })
        }

        calendarYears() {
            const currentYear = new Date().getFullYear();
            const yearsArray = Array.from({ length: 30 }, (_, i) => currentYear + i);
        
            const options = yearsArray.map(year => (
                <option key={year} value={year}>{year}</option>
                ));
                
            return options;
        }
        
        calendarMonth() {
            const today = new Date();
            const month = today.getMonth() + 1;
            const daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
            
            const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
            
            const options = daysArray.map(day => (
                <option key={day} value={day}>{day}</option>
                ));
                return options;
        
        }

        expiresChange(){
            let expires = ''
            let month = this.state.month === 'Month' ? initialState.card.expires.slice(0, 2) : this.state.month
            let year = this.state.year === 'Year' ? initialState.card.expires.slice(1) : this.state.year

            const card = { ...this.state.card }
             
            if (month.length >= 1){
                expires = `${month.slice(0, 2)}/${year.slice(2)}`
            } else {
                expires = month
            }

            this.setState({
                card: {
                    ...card,
                    expires: expires
                }
            });
    
        }

        rotatecard(val){
            this.setState({ cardFlipped: val })
        }

        renderForm() {
            const { cardFlipped } = this.state;
            

            return (
                <div className= 'overflow-container' >
                    <div className='content container-fluid'>
                        <Card {...this.state.card}  cardType={this.state.card.cardType}  flipped={cardFlipped} />
                        <div className="form">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group px-2">
                                        <label>Número do cartão </label>
                                        <input type="text" 
                                            className='form-control'
                                            maxLength={16}
                                            onChange={e => this.handleCardNumberChange(e)} 
                                            
                                            />
                                    </div>
                                </div>
        
                                <div className="col-12">
                                    <div className="form-group mt-2 px-2">
                                        <label>Nome no cartão </label>
                                        <input type="text" className='form-control'
                                            maxLength={16}
                                            onChange={e => this.handleCardHolderChange(e)} />
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mt-2 px-2">
                                        <div className="row mb-1">
                                            <label className='col-8'>Data de validade</label>
                                            <label className='col-3'> CVV</label>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="d-flex">
        
                                                    <select className='form-control mr-1' 
                                                        onChange={e => this.setState({ month: e.target.value }, this.expiresChange)}>                                                        <option>Month</option>
                                                        {this.calendarMonth()}
                                                    </select>
        
                                                    <select className='form-control mx-1' 
                                                    onChange={e => this.setState({ year: e.target.value }, this.expiresChange)}>
                                                        <option>Year</option>
                                                       {this.calendarYears()}
                                                    </select>
        
                                                <input type="text" className='form-control' 
                                                    onFocus={() => this.rotatecard(true)}
                                                    onBlur={() => this.rotatecard(false)}
                                                    onChange={e =>  this.handleCardCVCChange(e)}
                                                    maxLength={3}
                                                />
        
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="form-group mt-3">
                                    <div className="col-12">
                                        <button className="btn btn-primary col-12">enviar</button>
                                    </div>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>
            )
            
        }


        render() {
            return(

            <main>
                {this.renderForm()}
            </main>
            )
        }
    }
