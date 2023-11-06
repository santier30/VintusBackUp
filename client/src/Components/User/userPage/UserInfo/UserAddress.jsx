import AddAddress from "./AddressFIles/addAdress"
import { useState } from "react"
import useDeleteAddress from "../../../../Hooks/useDelete"
const UserAddress  = ()=>{

const [add,setAdd] = useState(false)
const userData = JSON.parse(localStorage.getItem("USER"))
const del = useDeleteAddress()


const deleteHandler =(id)=>{
  del(`/Vintus/Users/Delete/${id}`,{apiKey:userData.apiKey,email:userData.email},'/Usuario/Direcciones')
}
    return(
        <>
        { !add ? (
        <>
          <article className="addresSection">
            <h2>Direcciones</h2>
            <button onClick={() => setAdd(!add)}>Agregar dirección</button>
          </article>
          <article className="addresses">

          {userData.address.map((address)=>{
            return(
          <div className="address" key={address._id}>
          <p>{address.province}</p>
          <p>{address.postalCode}</p>
          <p>{address.street}</p>
          <p>{address.number}</p>
          <p>{address.apartment}</p>
          <button onClick={()=>{deleteHandler(address._id)}}>Borrar</button>
          </div>
            )
          })}

          </article>
          </>
        ) : (
          <AddAddress add={add} setAdd={setAdd} end='/Usuario/Direcciones'/>
        )}
      </>
      
     
    )
}
export default UserAddress