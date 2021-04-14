import React from 'react';
import Foodinfo from '../Components/Foodinf'
import Back from '../Icons/back.png'
import './MenuCombos.css'

const back = ()=>{

    return true
    
}

const MenuFood = (props)=>{
    return(
        <div id = "container-menu">
            <div id = "Header-menu-combo">
                <div id = "alphaAdd">
                <h1>Elije tu combo</h1>
                </div>
                <img src={Back}
                     onClick = {()=>{
                         //back to Main options
                         props.back()
                     }}
                />
                
                
            </div>
            <div id = "menu-food">
                <h2>Menu</h2>
            <Foodinfo
          title={"Napolitana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Carnes"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Mexicana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Pollo y Champiñones"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
            </div>

        </div>
    )
}

export default MenuFood;