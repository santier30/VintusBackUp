const UserCart = ({cartItem, onIncrease, onReduce})=>{
const subTotal = cartItem[0]?cartItem.reduce((a, c) => {return a += parseFloat(c.Price)*c.Amount}, 0).toFixed(2):"Precio Total"
console.log(subTotal)
    return(
        <>
        <article>
            <h2>Carrito</h2>
        </article>
        <article className="userCart">
        <div className="container">
            <article className="titles">
                
                <p>Producto</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Subtotal</p>

            </article>

 {    cartItem.map((wine)=>{
    return(
        <div className="userItem" key={wine.Name}>
            <img src={wine.Img} alt="" className="cart-img"/>
                <div className="userCart_item_content">
                    <h3>{wine.Name}</h3>
                    <p>{"$" + wine.Price}</p>
                    <div className="item-buttons">
                        <button onClick={()=>{onReduce(wine.Name)}}>-</button>
                        <span>{wine.Amount}</span>
                        <button onClick={()=>{onIncrease(wine.Name)}}>+</button>
                    </div>
                    <span className="total">{"$" + wine.Price*wine.Amount}</span>
                </div>
            </div>
    )
 })       }
        <div className="pay">
            
            <div><h3>{`Subtotal`}</h3><span>{"$" + subTotal}</span></div>
            <div><h3>{`Envio`}</h3><span>{Number(subTotal)>150?"Gratis":"$20"}</span></div>
            <div><h3>Total</h3><span>{Number(subTotal)>150?`$${subTotal}`:`$${Number(subTotal)+20}`}</span></div>
            <button>Comprar</button>
            
            
        </div>
        </div>
        </article>
        </>
    )
}
export default UserCart