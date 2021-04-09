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

function App() {

  const [viewPopRegister,setViewRegister] = useState() 
  const [cookies, setCookie] = useCookies(['name']);

  useEffect(()=>{
    // read cookies
    // verify name client did register
    // verify if we have a deliverid pending
    
    if(cookies.name === undefined){
      setViewRegister(<PopRegister/>)
    }
    

  },[])

  return (
    <div className="App">
      {viewPopRegister}
      <MenuFood/>
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
          title={"Napolitana"}
          price={"12.000"}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={"12.000"}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={"12.000"}
          desc = {"Personal 6 porciones"}
        />
        <Foodinfo
          title={"Napolitana"}
          price={"12.000"}
          desc = {"Personal 6 porciones"}
        />
        </div>
      </div>
      <div id = "container-options">

        <h2>Menu</h2>

        <div id="option" className="food"
         onClick={()=>{
           //open food menu
         }}
        
        >
          
          <div id ="alpha-img">
          <h3>Platos</h3>
          <img src={pizza}/>
          </div>
        </div>
        <div id="option" className="juice">
        <div id ="alpha-img">
          <h3>Bebidas</h3>
          <img src={refresco}/>
        </div>
          
        </div>
        <div id="option" className="salad">
          <div id ="alpha-img">
            <h3>Ensaladas</h3>
            <img src={ensalada}/>
          </div>
          
        </div>
        <div id="option" className="ice">
        <div id ="alpha-img">
        <h3>Helados</h3>
          <img src={helado}/>
          </div>
          
        </div>
        <div id="option" className="combo">
        <div id ="alpha-img">
        <h3>Combos</h3>
          <img src={combo}/>
        </div>
          
        </div>
      </div>

      <div id = "total-price">
        <p>$0</p>
        <div id = "button-car">
        <div id = "counter-button">
          <p>0</p>
        </div>
        <img src={carBuy}/>
      </div>
      </div>
      
    </div>
  );
}

export default App;
