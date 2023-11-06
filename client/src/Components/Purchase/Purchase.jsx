import UserProfile from "../User/userPage/UserInfo/UserProfile";
import { useState } from "react";
import AddAddress from "../User/userPage/UserInfo/AddressFIles/addAdress";
const Purchase = ()=>{
    const userData = JSON.parse(localStorage.getItem("USER"))
    const [add,setAdd] = useState(false)
    const [selectedAddress,setSelectedAddress] = useState(userData.address[0])
    console.log(selectedAddress)

    return(
        <main className="Purchase">
            <section className="PurchaseProfile">
            <UserProfile/>
            </section>
           <section className="AddressProfile">
           { !add ? (
        <>
          <article className="addresSection">
            <h2>Direcciones</h2>
            <button onClick={() => setAdd(!add)}>Agregar dirección</button>
          </article>
          <article className="addresses">

          {userData.address.map((address)=>{
            return(
          <div className={`address ${selectedAddress._id===address._id?"selected":""}`} key={address._id}>
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
           </section>
        </main>
    );
}
export default Purchase;