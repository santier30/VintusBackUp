
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useUser from '../../../Hooks/useUser';


const LogInForm = ()=>{
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const {log} = useUser("Entrando...","Bienvenido a Vintus","Email o contraseña incorrecta")


    const submitHandler = (event) => {
        event.preventDefault();
        console.log('a')

        log({email:email,password:pass},"/Vintus/Users/Login");
   
            
         };
    return(
                    <form action="" onSubmit={submitHandler}>
                        <h2>Vintus</h2>
                        <p>Bienvenido a Vintus logee se con su usuario y contraseña</p>
                        <input type="text" id="email" className="form__input" required minLength="3" value={email} placeholder="EMAIL" onChange={(event)=>{setEmail(event.target.value)}}/>
                        < p id="Email" className="animated"></p>
                        <input type="password" id="Pass" className="form__input" required minLength="3" value={pass} placeholder="CONTRASEÑA" onChange={(event)=>{setPass(event.target.value)}}/>
                        < p id="Password" className="animated"></p>
                        <div>
                        <Link to='/'>Cambiar contraseña</Link>
                        <span>/</span>
                        <Link to='/CrearCuenta'>Crear un usuario</Link>
                        </div>
                        <button>Ingresar</button>

                    </form>
    )
}

export default LogInForm