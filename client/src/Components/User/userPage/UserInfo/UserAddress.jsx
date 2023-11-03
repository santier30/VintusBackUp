import AddAddress from "./AddressFIles/addAdress"
import { useState } from "react"
const UserAddress  = ()=>{

const [add,setAdd] = useState(false)

    return(
        <>
        { !add ? (
          <article className="addresSection">
            <h2>Direcciones</h2>
            <button onClick={() => setAdd(!add)}>Agregar dirección</button>
          </article>
        ) : (
          <AddAddress add={add} setAdd={setAdd} />
        )}
      </>
      
     
    )
}
export default UserAddress