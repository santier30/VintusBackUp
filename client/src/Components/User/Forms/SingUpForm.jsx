
import { Link } from 'react-router-dom';
import useSingUp from '../../../Hooks/useSingUp';
import useError from '../../../Hooks/use-error';
import { useState } from 'react';
import useUser from '../../../Hooks/useUser';
const SingUpForm = ()=>{
    const [name,nameValidation,email,emailValidation,password, passwordValidation] = useSingUp();
    const makeError = useError()
    const [cPass,setCPass]=useState('')
    const {createUser} = useUser();

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('a')
        if (
          name.er==="" && email.er==="" && password.er==="" && password.value === cPass
        ) {
            createUser({name:name.value,email:email.value,password:password.value},"/Vintus/Users/SingUp")
   
            
        } 
      };




    return(
        <form action="" onSubmit={submitHandler}>
            <h2>Vintus</h2>
            <p>Bienvenido a Vintus cree su usuario </p>
            <input type="text" id="user" className="form__input" value={name.value} required minLength="6" placeholder="NOMBRE"  onChange={(event)=>{nameValidation(event.target.value)}}/>
            {name.er!=="" && name.er && <p id="name-error">{makeError(name.er)}</p>}


            <input type="email" id="email" className="form__input" value={email.value} required placeholder="EMAIL" onChange={(event)=>{emailValidation(event.target.value)}}/>
            {email.er!=="" && email.er && <p id="name-error">{makeError(email.er)}</p>}


            <input type="password" id="Pass" className="form__input" value={password.value} required minLength="8" placeholder="CONTRASEÑA" onChange={(event)=>{passwordValidation(event.target.value)}}/>
            {password.er!=="" && password.er && <p id="name-error">{makeError(password.er)}</p>}


            <input type="password" id="PassC" className="form__input" value={cPass} required minLength="8" placeholder="REPETIR CONTRASEÑA" onChange={(event)=>{setCPass(event.target.value)}}/>
            {cPass !== password.value && cPass !== '' && <p id="name-error">Las contraseñas no coinsiden</p>}

            <div>
            <span>Ya tienes cuenta</span>
            <span>/</span>
            <Link to='/LogIn'>Ingresar</Link>
            </div>
            <button>Crear Cuenta</button>

        </form>
)
}

export default SingUpForm