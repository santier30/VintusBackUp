
import useInput from "./use-Input";
const useSingUp=()=>{



const [name,setName,nameValidation]=useInput(
  (content)=>{  let message = [];
    if (content === "") {
        message.push("El nombre es obligatorio.");
      } else {
        if (content.length < 6 || content.length > 25) {
          message.push("El nombre debe tener entre 6 y 25 caracteres.");
        }
        if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/.test(content)) {
          message.push("Solo letras.");
        }
        if (/\s{2,}/.test(content)) {
          message.push("No ingrese espacios inesesarios.");
        }}
    return message.length ? message : "";}
);

const [email,setEmail,emailValidation]=useInput(
    (content)=>{ let message = [];
        if (content === "") {
            message.push("Email es obligatorio.");
          } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(content)
          ) {
            message.push("Email invalido.");
          }
    return message.length ? message : "";}
);

const [password, setPassword, passwordValidation] = useInput(
    (content) => {
      let message = [];
      if (content === "") {
        message.push("La contraseña es obligatoria.");
      } else {
        if (content.length < 8) {
          message.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/[a-z]/.test(content) || !/[A-Z]/.test(content) || !/[0-9]/.test(content)) {
          message.push("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.");
        }
      }
      return message.length ? message : "";
    }
  );


const reset =()=>{
    
        setEmail({ value: "", er: false }); 
        setPassword({ value: "", er: false }); 
        setName({ value: "", er: false }); 
        
 
    
};

    return[name,nameValidation,email,emailValidation,password, passwordValidation];
}
export default useSingUp;