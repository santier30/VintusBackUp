import { useState } from "react"
import AddAddress from "./AddressFIles/addAdress"
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago("TEST-995ee899-dae7-4488-a7de-70e37d66510f");
const UserCart = ({cartItem, onIncrease, onReduce , clear})=>{
    const [showAddres,setShowAddres] = useState(false)
    const [add,setAdd] = useState(false)
    const userData = JSON.parse(localStorage.getItem("USER"))
    const [selectedAddress,setSelectedAddress] = useState(userData.address[0])

const subTotal = cartItem[0]?cartItem.reduce((a, c) => {return a += parseFloat(c.Price)*c.Amount}, 0).toFixed(2):"Precio Total"
const total = Number(subTotal)>150?Number(subTotal):Number(subTotal)+20
console.log(total)


const payIdHandler = (event) => {
    event.preventDefault();
    if (
      selectedAddress && cartItem[0] && userData
      ){console.log('a')
      fetch("/Vintus/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({description:"Compra en Vintus",price:total,email:userData.email,apiKey:userData.apiKey,buy:{address:selectedAddress,cart:cartItem,price:total}}),
      })
        .then((response) => {
          console.log(response)
          return response.json();
        })
        .then((preference) => {
          clear()
          window.location.href = preference.url
 
          

          
        })
        .catch((error) => {
          console.error(error);
        })}    
     };
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
            <button onClick={()=>{setShowAddres(true)}} disabled={cartItem[0]?false:true}>Seleccionar Direccion</button>
            
            
        </div>
        </div>
        </article>
        {showAddres && <section className="AddressProfile">
           { !add ? (
        <>
          <article className="addresSection">
            <h2>Direcciones</h2>
            <button onClick={() => setAdd(!add)}>Agregar dirección</button>
          </article>
          <article className="addresses">

          {userData.address.map((address)=>{
            return(
          <div id="grey" className={`address ${selectedAddress._id===address._id?"select":""}`} key={address._id}>
          <p>{address.province}</p>
          <p>{address.postalCode}</p>
          <p>{address.street}</p>
          <p>{address.number}</p>
          <p>{address.apartment}</p>
          <button onClick={()=>{setSelectedAddress(address)}} >Seleccionar</button>
          </div>
            )
          })}

          </article>
          </>
        ) : (
          <AddAddress add={add} setAdd={setAdd} end='/Finalizar-Compra' />
        )}
           </section>} 

           <button style={{width:"100%"}} onClick={payIdHandler}>Finalizar</button>
         
        </>
    )
}
export default UserCart