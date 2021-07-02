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
import PopCash from './Components/PopCash';

import MenuFood from './Views/MenuFood';
import MenuDrink from './Views/MenuDrink';
import MenuSalad from './Views/MenuSalad';
import MenuIceCream from './Views/MenuIceCream';
import MenuCombos from './Views/MenuCombos';

import CarBuy from './Views/CarBuy';
import Payment from './Views/Payment';

import EventEmitter from './Utils/EventEmitter';
import APIData from './Utils/APICredentials';
import { traverseTwoPhase } from 'react-dom/test-utils';


const publicIp = require('react-public-ip');

var listShopping = []
var totalPriceAux = 0

function App() {


  var formatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
  })


  
  
  let [totalPrice, setTotalPrice]= useState(0)
  const [viewPopRegister,setViewRegister] = useState() 
  const [viewMenu,setViewMenu] = useState()
  const [viewCar,setViewCar] = useState()
  const [viewPayment,setViewPayment] = useState()
  const [viewCodeCash, setViewCodeCash] = useState()

  const [sizeList, setSizeList] = useState(0)
  const [cookies, setCookie] = useCookies(['name','codeCash']);


  const [listSuggest, setListSuggest] = useState([])

  const getIpPublic = async ()=>{
    await publicIp.v4()
                       .then((value)=>{
                         console.log(value)
                        })
  }
  

  const consultCash = (code)=>{
    fetch(APIData.URI+'Orders/searchCashOrder',{
      method:'PUT',
      body:JSON.stringify({code:code}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then((res)=>{
      if(res !== null){
        setViewCodeCash(<PopCash
          code = {res.code}
          back = {()=>{
            setViewCodeCash()
          }}
          />)
      }
    })
    .catch(err =>{
      if(err) throw err
    })
  }

  useEffect(()=>{
    // read cookies
    // verify name client did register
    // verify if we have a deliverid pending
    
    getIpPublic()
    EventEmitter.addListener('addToCart',(data)=>{
      listShopping.push(data)
      console.log(totalPriceAux)
      totalPriceAux = data.price + totalPriceAux
      
      
      setTotalPrice(totalPriceAux)
      setSizeList(listShopping.length)
      
    })
    if(cookies.name === undefined){
      setViewRegister(<PopRegister/>)
    }   
    
    if(cookies.codeCash === undefined || cookies.codeCash === ""){
      console.log(cookies.codeCash)
    }else{

      consultCash(cookies.codeCash)
      
    }
    
    
    fetch(APIData.URI + 'foods/showSuggest',{method:'PUT'})
                                                           .then(res => res.json())
                                                           .then((res)=>{setListSuggest(res)})
                                                           .catch(err=>{if(err) throw err})
    
  },[])

  return (
    <div className="App">
      {viewPopRegister}
      {viewMenu}
      {viewCar}
      {viewPayment} 
      {viewCodeCash}
      <div id = "Header">
        <h1>Bienvenido a Smart Restaurant</h1>
        <h3>Pide desde tu mesa sin pararte</h3>
        <h4>Mesa 4</h4>
        <h4>Que vas a pedir hoy {cookies.name}</h4>
      </div>
      <div>
        <h2>Sugeridos del dia</h2>
        <div id ="container-sug">
          {listSuggest.map((value)=>{
            return(
              <Foodinfo
            title={value.title}
            price={parseInt(value.price)}
            desc = {value.desc}
            image = {value.image}
          />
            )
              
          })}
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
                if(totalPriceAux === 0){
                  return true
                }
                console.log('open payment')
                setViewPayment(<Payment
                 totalPrice = {totalPriceAux}
                 order = {listShopping} 
                 back = {(value)=>{
                   setViewPayment()
                 }}
                 openBill={(code)=>{
                  setViewCodeCash(<PopCash
                    code = {code}
                    back = {()=>{
                      setViewCodeCash()
                    }}
                    />)
                    setViewPayment()
                    setViewCar()
                 }}
                />)
              }}
              back = {(value)=>{
                setViewCar()
              }}

              deleteElement = {(value)=>{
                
                
                listShopping = value.list
                if(listShopping !== undefined){
                  setSizeList(listShopping.length)
                }
                setTotalPrice(value.newPrice)
                totalPriceAux = value.newPrice
                console.log(totalPriceAux)
                
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
