import './cardForm.css'
import React, { Component } from "react"

import Form from '../form'



export default class CardForm extends Component {
    
    render() {
        return (
            <main>
                <div className='overflow-container'>
                <Form/>
                </div>
            </main>
        )
    }
    
}