import React ,{useEffect,useState}from 'react';
import Back from '../Icons/back.png'
import './CarBuy.css'
import { useCookies } from 'react-cookie'
import shoppingCart from '../Icons/shopping-cart.png'
import cancel from '../Icons/cancel.png'
import APIData from '../Utils/APICredentials';


const CarBuy = (props)=>{
    var itemsArrayAux = []
    var indexArray = 0;
    var totalPriceAux = parseInt(props.totalPrice)

    const [listItems, setListItems] = useState([])

    const [priceShow,  setPriceShow] = useState("")
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

    const renderList = ()=>{
        if(itemsArrayAux.length>0){
        setShowItems(
            <div id = "shopping-cart">
                {listItems.map((dataProduct)=>{
                    indexArray ++;
                    const saveIndex = indexArray
                    return(
                        <div id = "product">
                            
                            <img src={`${APIData.URI}images/${dataProduct.image}`}/>
                            
                            <div>
                                <p>{dataProduct.title}</p>
                                <p>{dataProduct.desc}</p>
                                <p id="price-text">{formatter.format(dataProduct.price)}</p>
                            </div>
                            <div id = "button-delete"
                              onClick = {()=>{
                                
                                

                                props.deleteElement(saveIndex)
                                console.log(saveIndex)
                                const elementDelete = itemsArrayAux.splice(saveIndex -1,1)
                                totalPriceAux = totalPriceAux - parseInt(elementDelete[0].price)
                                setPriceShow(totalPriceAux)
                                setListItems(itemsArrayAux)

                                setListItems(itemsArrayAux)
                                props.deleteElement({
                                    list:itemsArrayAux,
                                    newPrice: totalPriceAux
                                })
                                indexArray = 0
                                renderList()
                              }
                            }
                            >
                                <img src = {cancel}/>
                            </div>

                            
                        </div>
                        
                    )
                })}
            </div>
        )
        }else{
            setShowItems(
                <div id = "shopping-cart">
                 <img src = {shoppingCart}/>
                 <p>No hay nada dentro del carrito</p>
                </div>
            )
        }
    }

    useEffect(()=>{

        itemsArrayAux = props.itemsBuy
        setListItems(props.itemsBuy)
        
        setPriceShow(props.totalPrice) 

        
        renderList()
        

    },[listItems])

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
                <div id="foot"></div>
                <div id = "payment-container">
                    
                    <h3>Total a pagar: {formatter.format(priceShow)}</h3>
                                        
                    <div id = "button-payment"
                    onClick={()=>{
                        props.openPayment()
                    }}
                    >
                        <p>Pagar</p>
                    </div>
                                    
                </div>
            </div>

        </div>
    )
}

export default CarBuy;