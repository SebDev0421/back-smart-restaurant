import React from 'react';
import {useCookies} from 'react-cookie';

import './PopCash.css'


import back from '../Icons/back.png'

const PopCash = (props) =>{
    return(
        <div id = "container-cashCode">
            <div id = "container-popCash">
            
            <div id = "container-title">
                <h4>Acercate a caja</h4>
                <img src={back}
                  onClick = {()=>{
                      props.back()
                  }}
                />
            </div>
            <h3>Muestra esto en caja y paga</h3>
            <h1>{props.code}</h1>
            <div id = "btn-completeCash">
                <p>Completar proceso</p>
            </div>
            </div>
        </div>
    )
}

export default PopCash;