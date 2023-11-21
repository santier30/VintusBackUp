
import { Link , useLocation} from 'react-router-dom';
import { useState ,useEffect } from 'react';
const UserMenu = ({set})=>{
    const userData = JSON.parse(localStorage.getItem("USER"))
  const [active,setActive] = useState({Tienda:"active"})

    const location = useLocation();
    const currentPath = location.pathname;
  
    useEffect(() => {
      const pageName = currentPath.split('/').filter(Boolean)[1];
      setActive(pageName?{ [pageName]: "selected" }:{ Perfil: "selected" });
    }, [currentPath]);
    
    const logOut = ()=>{
      localStorage.clear();
      set([])
    }

    return(
       
      
           <nav  className='UserNav'>
           <h1>{"Hola, " + userData.name}</h1>
             <menu>
             <li ><Link className={active.Perfil} to={''}>Perfil</Link></li>
             <li ><Link className={active.Direcciones} to={'Direcciones'}>Direcciones</Link></li>
             <li ><Link className={active.Pedidos} to={'Pedidos'}>Pedidos</Link></li>
             <li ><Link className={active.Autenticacion} to={'Autenticacion'}>Autenticación</Link></li>
             <li ><Link className={active.Carrito} to={'Carrito'}>Carrito</Link></li>
             <li ><Link onClick={logOut}  to={'/'}>Salir</Link></li>
           </menu>
           </nav>
       
    )
}
export default UserMenu

