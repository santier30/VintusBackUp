import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUser = (load,suc,fail,a)=>{
    const navigate = useNavigate();
    const log = async (data, url) => {
        
        try {
          
          var id = toast.loading(load);
    
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
          toast.update(id, { render: suc, type: "success", isLoading: false, autoClose: true });
          localStorage.setItem("USER", JSON.stringify(user))
          navigate(a?a:"/")
          return;
        } catch (error) {
          console.error("error: ", error);
          toast.update(id, { render: fail, type: "error", isLoading: false, autoClose: true });
        }
      };
      const createUser = async (data, url) => {
        
        try {
          
          var id = toast.loading(load);
    
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
          toast.update(id, { render: suc, type: "success", isLoading: false, autoClose: true });
          localStorage.setItem("USER", JSON.stringify(user))
          navigate(a?a:"/")
          return;
        } catch (error) {
          console.error("error: ", error);
          toast.update(id, { render: fail, type: "error", isLoading: false, autoClose: true });
        }
      };
    return{log,createUser}
}
export default useUser