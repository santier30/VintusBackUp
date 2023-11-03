import useInput from "./use-Input";
const useProfile=()=>{


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
      ,'');

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
    ,'');

const [phone,setPhone,phoneValidation]=useInput(
    (content)=>{    let message = [];
        if (content === "") {
            return ""
          } else if (!/^\+54\s?(11|15)\s?\d{8}$/.test(content)) {
            message.push(
              "Formato +54 11 o +54 15 +8 digitos."
            );
          }
    return message.length ? message : "";}
,'');

const [dni, setDNI, dniValidation] = useInput((content) => {
    let message = [];
if (!/^\d{7,8}$/.test(content)) {
      message.push("DNI debe contener 7 u 8 dígitos numéricos.");
    }
    return message.length ? message : "";
  },'');



    return[phone,phoneValidation,setPhone,name,nameValidation,setName,email,emailValidation,setEmail,dni, setDNI, dniValidation];
}
export default useProfile;