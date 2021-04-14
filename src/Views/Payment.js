import React ,{useEffect,useState}from 'react';
import './Payment.css'
import Back from '../Icons/back.png'

import creditCard from '../Icons/tarjeta-de-credito.png'
import visa from '../Icons/visa.png'
import mastercard from '../Icons/mastercard.png'
import paypal from '../Icons/paypal.png'
import money from '../Icons/dinero.png'

import CreditCard from '../Components/CreditCard';
import close from '../Icons/close.png';


var countDigits = 0;
var bufferWordNumber = 0
var numberBuffer = ''

const AddCreditCard = (props)=>{
    var [cvc, setCvc] = useState('')
    var [expiry, setExpiry] = useState('')
    var [focus, setFocus] = useState('')
    var [name, setName] = useState('')
    var [number, setNumber] = useState('')
    return(
        <div id = "addCreditCardContainer">
            
            <div id = "popup-add">
            <div id="close-button">
                <img src={close}
                    onClick={()=>{
                        props.back()
                    }}
                />
            </div>
                <CreditCard
                 number = {number}
                 ccv = {cvc}
                 name = {name}
                 expiry = {expiry}
                />
                <input
                    placeholder = "Numero"
                    onChange={(value)=>{
                        const numberWord = value.target.value
                        const lenWord = numberWord.length
                        if(/^\d+$/.test(value.target.value.substring(lenWord-1))){
                        
                        if(lenWord === 4 || lenWord === 9 || lenWord === 14){
                            setNumber(numberWord+' ')
                            return true
                        }
                        setNumber(numberWord)
                    }
                    }}

                    value = {number}

                    
                >
                    
                </input>
                
                <input
                 placeholder = "Nombre"
                 onChange={(value)=>{
                    setName(value.target.value.toUpperCase())
                }}

                value = {name}
                />
                <div id="short-data">

                
                <input
                 placeholder = "Fecha expiracion"
                 onChange={(value)=>{
                    const numberWord = value.target.value
                    const lenWord = numberWord.length
                    if(/^\d+$/.test(value.target.value.substring(lenWord-1))){
                    
                    if(lenWord === 2 ){
                        setExpiry(numberWord+'/')
                        return true
                    }
                    setExpiry(numberWord)
                }
    
                }}
                value = {expiry}
                />
                <input
                 placeholder = "CVC"
                 onChange={(value)=>{
                    const numberWord = value.target.value
                    const lenWord = numberWord.length
                    if(/^\d+$/.test(value.target.value.substring(lenWord-1))){
                    setCvc(value.target.value)
                }
                }}
                value = {cvc}
                />
                </div>

                <div id = "button-add"
                 onClick={()=>{
                     setNumber('')
                     setName('')
                     setExpiry('')
                     setCvc('')
                 }}
                >
                    <h3>Corregir datos</h3>
                </div>
                <div id = "button-add">
                    <h3>Añadir tarjeta</h3>
                </div>
            </div>
        </div>
    )
}


const Payment = (props)=>{
    
    var formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
      })

    const [addCard, setAddCard] = useState()

    return(
        <div id= "container-payment">
            {addCard}
            <div id = "Header-payment">
                <img src={Back}
                     onClick = {()=>{
                         //back to Main options
                         props.back()
                     }}
                />
            </div>
            <div id = "payment-methods-list">
                <h2>Metodos de pago</h2>
                <div id = "list-cards">
                    <div id = "item-payment"
                         onClick = {()=>{
                             //open add card
                             setAddCard(<AddCreditCard
                              back={()=>{
                                  setAddCard()
                              }}
                             />)
                         }}
                    >
                        <img src={creditCard}/>
                        <p>Agregar tarjeta</p>
                    </div>
                    <div id = "item-payment">
                        <img src={money}/>
                        <p>Efectivo</p>
                    </div>
                    <div id = "item-payment">
                        <img src={paypal}/>
                        <p>PayPal</p>
                    </div>

                </div>
            </div>
            <div id = "payment-container-price">
                <h3>Total a pagar: {formatter.format(props.totalPrice)}</h3>
            </div>
        </div>
    )
}

export default Payment;