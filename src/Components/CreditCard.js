import React,{useEffect, useState} from 'react';

import './CreditCard.css'

import chip from '../Images/chip.png'
import visa from '../Icons/visa.png'
import mastercard from '../Icons/mastercard.png'



const CreditCard = (props)=>{

    const [imgCard,setImgCard] = useState()
    var [cvc, setCvc] = useState('')
    var [expiry, setExpiry] = useState('')
    var [focus, setFocus] = useState('')
    var [name, setName] = useState('')
    var [number, setNumber] = useState('')
    var [colorCard, setColorCard] = useState("rgb(197, 197, 197)")


    useEffect(()=>{
        setNumber(props.number)
        setExpiry(props.expiry)
        setCvc(props.ccv)
        setName(props.name)
        if(props.number === '' || props.number === undefined){
            setNumber('0000 0000 0000 0000')
        }

        if(props.name === '' || props.name === undefined){
            setName('NOMBRE Y APELLIDO')
        }

        if(props.expiry === '' || props.expiry === undefined){
            setExpiry('00/00')
        }

        if(props.ccv === '' || props.ccv === undefined){
            setCvc('000')
        }
        
        if(props.number.substring(0,1) === '4'){
            setImgCard(<img src={visa} id="logo-card"/>)
            setColorCard("#1B6CB4")
        }else if(props.number.substring(0,1) === '5'){
            setImgCard(<img src={mastercard} id="logo-card"/>)
            setColorCard('#E73636')
        }else{
            setImgCard()
        }
    },[props.number,props.name,props.cvc,props.expiry])
    
    return(
        <div id = "creditcard-container" style={{background:colorCard}}>
            <div id="img-container-card">
            <img src={chip} id="chip-img"/>
            {imgCard}
            </div>
            
            <p id="number-card">{number}</p>
            <div id="expiry-card">
              <p >{expiry}</p>
              <p>CVC {cvc}</p>
            </div>
            
            <p id="name-card">{name}</p>

        </div>

    )
}

export default CreditCard;