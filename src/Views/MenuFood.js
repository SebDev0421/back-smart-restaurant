import React ,{useState,useEffect}from 'react';
import Foodinfo from '../Components/Foodinf'
import Back from '../Icons/back.png'
import APIData from '../Utils/APICredentials';
import './MenuFood.css'


const MenuFood = (props)=>{

  const [dataFood, setDataFood] = useState([])

  useEffect(()=>{
    fetch(APIData.URI+"foods/getFoods",{
      method:'PUT',
      body:JSON.stringify({type:'Comida'}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then((res)=>{
      setDataFood(res)
    })
    .catch(err=>{
      if(err) throw err
    })
  },[])
    return(
        <div id = "container-menu">
            <div id = "Header-menu">
                <div id = "alphaAdd">
                <h1>Elije tu plato</h1>
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
                {dataFood.map((value)=>{
                  console.log(value)
                  return(
                    <Foodinfo
                    title={value.title}
                    price={parseInt(value.price)}
                    desc = {value.desc}
                    image = {value.image}
                    />

                  )
                })}

            <div id = "foot"/>
            </div>

        </div>
    )
}

export default MenuFood;