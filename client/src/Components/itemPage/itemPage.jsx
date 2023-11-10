import { useState , useEffect,useContext,useCallback } from "react";
import { useParams, useLocation } from 'react-router-dom';
import CartContext from '../cart/CartContext'
import ReactImageZoom from 'react-image-zoom';
const ItemPage = ()=>{
  const { name } = useParams();
  const query = useLocation().search.slice(1);


const [wine,setWine]=useState({})
const [quantity,setQuantity]=useState(1)
let image =  wine.image;
const ctx = useContext(CartContext)
const props = {img: image,zoomPosition: "original",width: 300};

const Add = ()=>{
ctx.onAdd( wine.name,image, wine.price,wine.stock,quantity)}

const getWine =  useCallback(async()=>{
try {
  const response = await fetch(`/Vintus/Products/Buy/${name}?key=${query}`);
  if(!response.ok){throw new Error("Error fetching wines")}
  const data = await response.json()
  setWine(data)
} catch (error) {
  console.error("Error fetching wine data:", error);
}

},[name, query])

    useEffect(() => {
      getWine()
    }, [getWine])

    return(<main className="itemPage">
      <section className="itemSec">
        <article className="itemImg" >
          {image && <ReactImageZoom {...props}/>}
          <img src={image} alt={name}  style={{height: '110px',width:' 110px'}}/>
        </article>
        <article className="itemArt">
          <h2 className="under">{name + ` (${wine.stock})`}</h2>
          <h3 className="under" >CONTENIDO</h3>
          <p className="under">{wine.long_description}</p>

          <div className="itemAdd">
            <p>Precio unitario</p>
            <span className="price">{'$ ' +wine.price}</span>

            <p>Seleccione Cantidad</p>

            <div className="item-buttons">
            <button onClick={()=>{setQuantity(()=>quantity===1?1:quantity-1)}} >-</button>
            <div>{quantity}</div>
            <button onClick={()=>{setQuantity(()=>quantity===wine.stock?quantity:quantity+1)}}>+</button>

          </div>
          <button className="add" onClick={Add}>Agregar al carrito</button>
          </div>

        </article>
        <div className="corner_top1"></div>
        <div className="corner_botom1"></div>
        <div className="corner_top2"></div>
        <div className="corner_botom2"></div>
      </section>

    </main>)
}

export default ItemPage