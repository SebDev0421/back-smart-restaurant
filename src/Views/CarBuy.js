import React ,{useEffect,useState}from 'react';
import Foodinfo from '../Components/Foodinf'
import Back from '../Icons/back.png'
import './CarBuy.css'
import { useCookies } from 'react-cookie'
import pizza_napolitana from '../Images/pizza-napolitana.jpeg'
import shoppingCart from '../Icons/shopping-cart.png'



const CarBuy = (props)=>{
    const dataArray = [{price:12000,title:"pizza"}]

    var indexArray = 0;

    var formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
      })

    const [showItems,setShowItems] = useState(
        
            <div id = "shopping-cart">
                <img src = {shoppingCart}/>
                <p>No hay nada dentro del carrito</p>
            </div>
        
    )
    const back = ()=>{

        return true
        
    }

    useEffect(()=>{
        if(props.sizeList>0){
            setShowItems(
                <div id = "shopping-cart">
                    {props.itemsBuy.map((dataProduct)=>{
                        indexArray ++;
                        return(
                            <div id = "product">
                                
                                <img src={pizza_napolitana}/>
                                
                                <div>
                                    <p>{dataProduct.title}</p>
                                    <p>{dataProduct.desc}</p>
                                    <p id="price-text">{formatter.format(dataProduct.price)}</p>
                                </div>

                                <div id = "payment-container">
                                        <div>
                                            <h3>Total a pagar: {formatter.format(props.totalPrice)}</h3>
                                        </div>
                                        <div id = "button-payment"
                                         onClick={()=>{
                                             props.openPayment()
                                         }}
                                        >
                                            <p>Pagar</p>
                                        </div>
                                    
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            )
        }
    },[])
    return(


        <div id = "container-cart">
            <div id = "Header-car">
                <img src={Back}
                     onClick = {()=>{
                         //back to Main options
                         props.back()
                     }}
                />
                
                
            </div>
            <div id = "car-buy-list">
                <h2>Carrito</h2>
                {showItems}
            </div>

        </div>
    )
}

export default CarBuy;