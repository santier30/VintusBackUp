import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUser = ()=>{
    const navigate = useNavigate();
    const log = async (data, url) => {
        
        try {
          
          var id = toast.loading("Entrando...");
    
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(response.message);
          }
          const user = await response.json();
          toast.update(id, { render: "Bienvenido a Vintus", type: "success", isLoading: false, autoClose: true });
          localStorage.setItem("USER", JSON.stringify(user))
          navigate('/')
          return;
        } catch (error) {
          console.error("error: ", error);
          toast.update(id, { render: "Email o contraseña incorrecta", type: "error", isLoading: false, autoClose: true });
        }
      };
      const createUser = async (data, url) => {
        
        try {
          
          var id = toast.loading("Creando Usuario...");
    
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(response.message);
          }
          const user = await response.json();
          toast.update(id, { render: "Bienvenido a Vintus", type: "success", isLoading: false, autoClose: true });
          localStorage.setItem("USER", JSON.stringify(user))
          navigate('/')
          return;
        } catch (error) {
          console.error("error: ", error);
          toast.update(id, { render: "Este email ya esta asosiado a una cuenta", type: "error", isLoading: false, autoClose: true });
        }
      };
    return{log,createUser}
}
export default useUser