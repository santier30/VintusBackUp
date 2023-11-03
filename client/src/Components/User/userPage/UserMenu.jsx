
import { Link , useLocation} from 'react-router-dom';
import { useState ,useEffect } from 'react';
const UserMenu = ()=>{
    const userData = JSON.parse(localStorage.getItem("USER"))
   
    return(
       
      
           <nav  className='UserNav'>
           <h1>{"Hola, " + userData.name}</h1>
             <menu>
             <li ><Link to={''}>Perfil</Link></li>
             <li ><Link to={'Direcciones'}>Direcciones</Link></li>
             <li ><Link to={'Pedidos'}>Pedidos</Link></li>
             <li ><Link to={'Autenticación'}>Autenticación</Link></li>
             <li ><Link to={'Carrito'}>Carrito</Link></li>
           </menu>
           </nav>
       
    )
}
export default UserMenu

