
import CartContext from '../../cart/CartContext'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const Wine = ({wine})=>{
  let image =wine.image;


  const ctx = useContext(CartContext)

const Add = ()=>{
ctx.onAdd( wine.name,image, wine.price ,wine.stock)
}
    return(
    <div className="wine_div">
            <img className="wine_img" src={image} alt={ wine.name} />
            <div className="wine_buttons">
              <div className="wine_buttons-container">
                <button className="buy-link" >
                 <Link to={`/${wine.name}`} className='reset'>$ Buy</Link>
                </button>
                <button className="buy-link" onClick={Add} >
                  <i className="fa fa-shopping-cart"></i>
                  Add to Cart
                </button>
              </div>
              <p className='short_des'>{ wine.short_description}</p>
            </div>
            <h2>{ wine.name} ({ wine.stock})</h2>
            <h2>${ wine.price}</h2>
          </div>
    )
}
export default Wine