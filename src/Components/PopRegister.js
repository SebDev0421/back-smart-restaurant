import './PopRegister.css'
import React,{useState} from 'react'
import addNotification from 'react-push-notification'
import { useCookies } from 'react-cookie'

const PopRegister = ()=>{
    const [name,setName] = useState('')
    const [cookie,setCookie] = useCookies(['name'])
    return(
        <div id = "container-screen">
            <div id = "popup-register">
                <h2>Querido cliente ingresa tu nombre para tu pedido</h2>
                <input placeholder="Ingresa tu nombre"
                 onChange={(readData)=>{
                     setName(readData.target.value)
                 }}
                />
                <div id= "button-register"
                
                onClick={()=>{
                    addNotification({
                        title: 'Warning',
                        subtitle: 'This a subtitle',
                        message: 'this is a very long message',
                        theme:'darkblue',
                        native:true
                    })
                    if(name == ""){
                        alert('Nesecitamos tu nombre para tomar tu pedido')
                    }else{
                        //save in cookies
                        setCookie('name',name,{path:'/'})
                        window.location.reload()
                    }
                }}
                
                >
                    <p>Empezar a pedir</p>
                </div>
            </div>
        </div>
    )
}

export default PopRegister;