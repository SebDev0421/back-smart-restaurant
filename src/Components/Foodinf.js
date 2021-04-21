import './Foodinf.css';
import pizzaImage from '../Images/pizza-napolitana.jpeg'

import EventEmitter from '../Utils/EventEmitter'


const Foodinfo = (props)=>{

    var formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
    })
    return(
        <div id = "container-inf">
            <h3>{props.title}</h3>
            <img src={`http://localhost:5000/images/${props.image}`}/>
            <p>{formatter.format(props.price)}</p>
            <p>{props.desc}</p>
            
            <button
             onClick={()=>{
                  EventEmitter.emit('addToCart',{
                    title:props.title,
                    price:props.price,
                    desc:props.desc,
                    image:props.image
                })
             }}
            >Agregar</button>
                    

        </div>
    )
}

export default Foodinfo;

