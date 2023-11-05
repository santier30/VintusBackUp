import { useState } from "react"
import useInput from "../../../../Hooks/use-Input"
import useError from "../../../../Hooks/use-error"
import useUser from "../../../../Hooks/useUser"
const UserAuth = ()=>{
    const makeError = useError()
    const [change,setChange] = useState()
    const [pass,setPass] = useState("")
    const {log}= useUser("Guardando...","Guardado","Fallo en el guardado",'/Usuario/Autenticacion');
    const userData = JSON.parse(localStorage.getItem("USER"))
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

      const submitHandler = (event) => {
        event.preventDefault();

        if (
            password.er===""
          ){console.log('a')
            log({apiKey:userData.apiKey,email:userData.email,newPassword:password.value,password:pass},"/Vintus/Users/Password");
          }
   
            
         };
         const reset = () => {
            setPass("")
            setPassword({value:"",er:false})
         }
    return(
        <>
        <article>
            <h2>Autenticación</h2>
        </article>
        <article className="passSection">
       <h3>Contraseña</h3>
       {!change && <p>***************</p>}
       {change && <form onSubmit={(event)=>{submitHandler(event);setChange(false);reset()}}>
        <input type="password" id="Pass" className="form__input" required minLength="3" value={pass} placeholder="CONTRASEÑA  ACTUAL" onChange={(event)=>{setPass(event.target.value)}}/>
        <input type="password" id="Password" className="form__input" value={password.value} required minLength="8" placeholder="NUEVA  CONTRASEÑA" onChange={(event)=>{passwordValidation(event.target.value)}}/>
        {password.er!=="" && password.er && <p id="name-error">{makeError(password.er)}</p>}
        <button type="submit">Enviar</button>
        </form>}

       {!change &&<button onClick={()=>setChange(true)}>Cambiar contraseña</button>}
      
    </article></>
    )
}
export default UserAuth