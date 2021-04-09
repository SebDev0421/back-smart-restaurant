import './Foodinf.css';
import pizzaImage from '../Images/pizza-napolitana.jpeg'

const Foodinfo = (props)=>{
    return(
        <div id = "container-inf">
            <h3>{props.title}</h3>
            <img src={pizzaImage}/>
            <p>${props.price}</p>
            <p>{props.desc}</p>
            
            <button>Agregar</button>
                    

        </div>
    )
}

export default Foodinfo;

