import { useState,useEffect } from 'react';
import './Components/SASS/Syles.scss';
import Cart from './Components/cart/Cart';
import Menu from "./Components/menu/menu"
import Alta from './Components/alta/alta';
import SobreNosotros from './Components/sobreNosotros/sobreNosotros';
import Contactos from './Components/contactos/contactos';
import Landing from './Components/landing/Landing';
import Shop from './Components/shop/shop';
import { Route, Routes } from 'react-router-dom';
import useCart from './Hooks/use-cart';
import CartContext from './Components/cart/CartContext';
import 'font-awesome/css/font-awesome.min.css';
import Footer from './Components/footer/footer';
import ItemPage from './Components/itemPage/ItemPage/itemPage';
import LogIn from './Components/User/LogIn';
import SingUp from './Components/User/SingUp';
import UserPage from './Components/User/userPage/UserPage';
import UserAddress from './Components/User/userPage/UserInfo/UserAddress';
import UserAuth from './Components/User/userPage/UserInfo/userAuth';
import UserCart from './Components/User/userPage/UserInfo/UserCart';
import UserOrders from './Components/User/userPage/UserInfo/UserOrders';
import UserProfile from './Components/User/userPage/UserInfo/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
function App() {
  

  const [cartDysplay,setCartDisplay]=useState("")
  const [cartItems,addToCartHandler,reduce,increase]=useCart();
  const userData = JSON.parse(localStorage.getItem("USER"))
  const location = useLocation();
  const showCart = ()=>{
    setCartDisplay(()=>cartDysplay===""?"show":"")
  }
  const updetedData = async ()=>{
    try {
      const response = await fetch("/Vintus/Users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:userData.email, password:userData.password}),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }
      const user = await response.json();
      localStorage.setItem("USER", JSON.stringify(user))

      return;
    } catch (error) {
      console.error("error: ", error);
      localStorage.clear()
    }
  };
  useEffect(() => {
    if(userData){
      console.log("aasdasdasd")
      updetedData()
    }
  
  }, [location]);
  


  return (
    <CartContext.Provider value={{onAdd:addToCartHandler}} >
    <>
    <Cart displayState={cartDysplay} cartItem={cartItems} onIncrease={increase} onReduce={reduce} />
    <Menu setDisplayState={showCart}/>
    <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark" />
    <Routes>
    <Route path="/Alta" element={<Alta />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/Tienda" element={<Shop/>} />
        <Route path="/:name" element={<ItemPage/>} />
        <Route path="/Ingresar" element={<LogIn/>} />
        <Route path="/CrearCuenta" element={<SingUp/>} />
        <Route path="/" element={<Landing/>} />
        <Route path="/Usuario" element={<UserPage />}>
          <Route index element={<UserProfile/>} /> 
          <Route path="Direcciones" element={<UserAddress/>} />
          <Route path="Pedidos" element={<UserOrders />} />
          <Route path="Autenticación" element={<UserAuth />} />
          <Route path="Carrito" element={<UserCart />} />
        </Route>
        <Route path="/*" element={<h1>Error page not found</h1>} />
    </Routes>
    <Footer/>
  </>
  </CartContext.Provider>
  );
}

export default App;
