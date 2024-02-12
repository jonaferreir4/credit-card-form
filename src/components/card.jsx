import './card.css'
import React from 'react'
import chip from '../assets/imgs/chip.png'

export default props => {
    console.log(props)
    const rotate = props.flipped ? 'd-none' : ''
    const backRotate = props.flipped ? 'd-block' : ''
    

    return (

        <>
        <div className={`card container-fluid ${rotate}`}>
            <div className="row">
                <div className="col-12 d-flex justify-content-between">
                    <div className="chip m-4">
                        <img src={chip} alt='chip' />
                    </div>
                    <div className="cardType m-4">
                        <img src={props.cardType} alt="" />
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-12">
                    <div className="cardNumber">
                        {props.cardNumber}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-between">
                    <div className="cardHolder">
                        Titular do cartão
                        <div className="cardHolderProp">
                            {props.cardHolder}
                        </div>
                    </div>
                    <div className="expires">
                        Data de expiração
                        <div className='expiresProp d-flex justify-content-center'>
                            {props.expires}
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className={`card-back container-fluid ${backRotate}`}>

            <div className="row">
                <div className=" black col-12 mt-4"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <label className='d-flex justify-content-end mx-1 mt-4' >CVV</label>
                <div className="white col-12 mt-2 d-flex justify-content-end">
                    {props.cvv}
                </div>
            </div>

            <div className="row d-flex justify-content-end">
            <div className="cardType m-2">
                    <img src={props.cardType} alt="" />
                </div>,
            </div>

        </div>
    </>
        )   

    }