import logo from './logo.svg';
import './App.css';

import React, {useEffect,useState} from 'react'
import { useCookies } from 'react-cookie'

import carBuy from './Icons/carBuy.png'
import pizza from './Icons/pizza.png'
import refresco from './Icons/refresco.png'
import helado from './Icons/helado.png'
import ensalada from './Icons/ensalada.png'
import combo from './Icons/combo.png'

import PopRegister from './Components/PopRegister';
import Foodinfo from './Components/Foodinf';

import MenuFood from './Views/MenuFood';
import MenuDrink from './Views/MenuDrink';
import MenuSalad from './Views/MenuSalad';
import MenuIceCream from './Views/MenuIceCream';
import MenuCombos from './Views/MenuCombos';

import CarBuy from './Views/CarBuy';
import Payment from './Views/Payment';

import EventEmitter from './Utils/EventEmitter';

var listShopping = []

function App() {


  var formatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
  })


  
  let totalPriceAux = 0
  let [totalPrice, setTotalPrice]= useState(0)
  const [viewPopRegister,setViewRegister] = useState() 
  const [viewMenu,setViewMenu] = useState()
  const [viewCar,setViewCar] = useState()
  const [viewPayment,setViewPayment] = useState()
  const [sizeList, setSizeList] = useState(0)
  const [cookies, setCookie] = useCookies(['name']);

  

  useEffect(()=>{
    // read cookies
    // verify name client did register
    // verify if we have a deliverid pending
    /* EventEmitter.('addToCart',(data)=>{
      console.log(data)
    }) */
    EventEmitter.addListener('addToCart',(data)=>{
      console.log(data)
      listShopping.push(data)
      totalPriceAux = data.price + totalPriceAux
      
      setTotalPrice(totalPriceAux)
      console.log(listShopping)
      setSizeList(listShopping.length)
      
    })
    if(cookies.name === undefined){
      setViewRegister(<PopRegister/>)
    }    
    
  },[])

  return (
    <div className="App">
      {viewPopRegister}
      {viewMenu}
      {viewCar}
      {viewPayment} 
      <div id = "Header">
        <h1>Bienvenido a Smart Restaurant</h1>
        <h3>Pide desde tu mesa sin pararte</h3>
        <h4>Mesa 4</h4>
        <h4>Que vas a pedir hoy {cookies.name}</h4>
      </div>
      <div>
        <h2>Sugeridos del dia</h2>
        <div id ="container-sug">
          <Foodinfo
          title={"Pizza Napolitana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={12000}
          desc = {"Personal 6 porciones"}
        />
        </div>
      </div>
      <div id = "container-options">

        <h2>Menu</h2>

        <div id="option" className="food"
         onClick={()=>{
           //open food menu
           setViewMenu(<MenuFood
            back = {(value)=>{
              setViewMenu()
            }}
           />)
         }}
        
        >
          
          <div id ="alpha-img">
          <h3>Platos</h3>
          <img src={pizza}/>
          </div>
        </div>
        <div id="option" className="juice"
             onClick={()=>{
              //open food menu
              setViewMenu(<MenuDrink
               back = {(value)=>{
                 setViewMenu()
               }}
              />)
            }}
        >
        <div id ="alpha-img">
          <h3>Bebidas</h3>
          <img src={refresco}/>
        </div>
          
        </div>
        <div id="option" className="salad"
         onClick={()=>{
          //open food menu
          setViewMenu(<MenuSalad
           back = {(value)=>{
             setViewMenu()
           }}
          />)
        }}
        >
          <div id ="alpha-img">
            <h3>Ensaladas</h3>
            <img src={ensalada}/>
          </div>
          
        </div>
        <div id="option" className="ice"
         onClick={()=>{
          //open food menu
          setViewMenu(<MenuIceCream
           back = {(value)=>{
             setViewMenu()
           }}
          />)
        }}
        >
        <div id ="alpha-img">
        <h3>Helados</h3>
          <img src={helado}/>
          </div>
          
        </div>
        <div id="option" className="combo"
         onClick={()=>{
          //open food menu
          setViewMenu(<MenuCombos
           back = {(value)=>{
             setViewMenu()
           }}
          />)
        }}
        >
        <div id ="alpha-img">
        <h3>Combos</h3>
          <img src={combo}/>
        </div>
          
        </div>
      </div>

      <div id = "total-price">
        <p>{formatter.format(totalPrice)}</p>
        <div id = "button-car"
         onClick = {()=>{
           setViewCar(
             <CarBuy
              sizeList = {sizeList}
              itemsBuy = {listShopping}
              totalPrice = {totalPrice}
              openPayment = {()=>{

                console.log('open payment')
                setViewPayment(<Payment
                 totalPrice = {totalPrice}
                 back = {(value)=>{
                   setViewPayment()
                 }}
                />)
              }}
              back = {(value)=>{
                setViewCar()
              }}
             />
           )
         }}
        >
        <div id = "counter-button">
          <p>{sizeList}</p>
        </div>
        <img src={carBuy}/>
      </div>
      </div>
      
    </div>
  );
}

export default App;
