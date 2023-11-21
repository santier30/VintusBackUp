import { useReducer,useEffect,useState,useRef } from "react";
import { toast } from "react-toastify";

const useCart=()=>{
const userData = JSON.parse(localStorage.getItem("USER"))
const [flag,setFlag] = useState(true);
let timer = useRef(undefined); 
const isCartUpdateRunning = useRef(false);
const cartUpdate = async (data) => {
  
  try {
    
    var id = toast.loading("guardando...");

    const response = await fetch("/Vintus/Users/Cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:userData.email,apiKey:userData.apiKey,cart:data}),
    });

    if (!response.ok) {
      throw new Error(response.message);
    }
    console.log(response);
    const user = await response.json();
    toast.update(id, { render: "Guardado", type: "success", isLoading: false, autoClose: true });
    localStorage.setItem("USER", JSON.stringify(user))
    return;
  } catch (error) {
    console.error("error: ", error);
    toast.update(id, { render: "Error en el guardado", type: "error", isLoading: false, autoClose: true });

  }
};
  const tSuc = ()=>{
    toast.dismiss();
    toast.success("Agragado al carrito", {
      position: "top-center", 
      autoClose: 1500, 
    });
  };
  const tFail = ()=>{
    toast.dismiss();
    toast.error("No hay suficiente stock", {
      position: "top-center", 
      autoClose: 1500, 
    });
  }
    const cartReducer = (state, action) => {
        switch (action.type) {
          case "ADD_TO_CART":
            const foundIndex = state.findIndex(item => item.Name === action.payload.Name);
            if (foundIndex !== -1) {
              if(state[foundIndex].Amount + action.payload.Amount <= action.payload.Stock) {
                console.log(action.payload.Amount)
              const updatedItem = { ...state[foundIndex], Amount: state[foundIndex].Amount + action.payload.Amount };
                tSuc();
              return [...state.slice(0, foundIndex), updatedItem, ...state.slice(foundIndex + 1)];
            } else{
              tFail();
              return [...state]
            }
          }
              tSuc();
              return [...state, action.payload];
            
          case "DECREASE_AMOUNT":
            const decreaseIndex = state.findIndex(item => item.Name === action.payload);
            if(state[decreaseIndex].Amount - 1 !== 0){
              const decreasedItem = { ...state[decreaseIndex], Amount: state[decreaseIndex].Amount - 1 };
              return [...state.slice(0, decreaseIndex), decreasedItem, ...state.slice(decreaseIndex + 1)];
            }return[...state.slice(0, decreaseIndex), ...state.slice(decreaseIndex + 1)]

          case "INCREASE_AMOUNT":
            const increaseIndex = state.findIndex(item => item.Name === action.payload);
            if(state[increaseIndex].Amount + 1 <= state[increaseIndex].Stock){
              const increasedItem = { ...state[increaseIndex], Amount: state[increaseIndex].Amount + 1 };
              return [...state.slice(0, increaseIndex), increasedItem, ...state.slice(increaseIndex + 1)];
            }
            tFail();
            return state
            case "SET":

                return action.payload;
      
            case "CLEAR":
              return []
          
          default:
            return state;
        }
      };
      
      const savedCartData = localStorage.getItem("cartItems")
      const initialState = savedCartData ? JSON.parse(savedCartData) : [];
      const [cartItems, dispatchCartItems] = useReducer(cartReducer, initialState);
      
      
        const addToCartHandler = (Name, Img, Price ,Stock, Amount=1) => {
          const Item = { Name: Name, Price: Price, Img: Img,Stock:Stock, Amount: Amount };
          dispatchCartItems({ type: "ADD_TO_CART", payload: Item });
        };
        
      
        const reduce = Name => {
          dispatchCartItems({ type: "DECREASE_AMOUNT", payload: Name });
        };
      
        const increase = Name => {
          dispatchCartItems({ type: "INCREASE_AMOUNT", payload: Name });
        };
        const clear = Name => {
          dispatchCartItems({ type: "CLEAR", payload: Name });
        };
        const set = cart => {
          dispatchCartItems({ type: "SET", payload:cart });
        };
if(!userData && !flag){
  setFlag(true)
}
if(userData && flag){
  if(userData.cart){
    setFlag(false);
    localStorage.setItem("cartItems", JSON.stringify([]));
    set(userData.cart)
  }
}
const update = async() => {
           
  if (!isCartUpdateRunning.current) {
    isCartUpdateRunning.current = true;

      await cartUpdate(cartItems);

      isCartUpdateRunning.current = false;
   
  }else{toast.error("Error al guardar espere al guardado o guarde manual", {
    position: "top-center", 
    autoClose: 3000, 
  });}
  return
 
}
        useEffect(() => {
          // console.log(cartItems)

          if(userData){
            if (typeof timer.current !== 'undefined') {
              clearTimeout(timer.current);
            }
            timer.current = setTimeout(async() => {
        
               update()
             
            },1000 );
           
            return () => {
              if (typeof timer.current !== 'undefined') {
                clearTimeout(timer.current);
              }
            };
          }else{
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
          }
        }, [cartItems]);
      


        return [cartItems,addToCartHandler,reduce,increase,clear,update,set];
};
export default useCart;