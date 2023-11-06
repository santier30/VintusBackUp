import { useState } from "react"
import useProfile from "../../../../Hooks/use-profile"
import useError from "../../../../Hooks/use-error"
import useUser from "../../../../Hooks/useUser"
const UserProfile = ()=>{
    const userData = JSON.parse(localStorage.getItem("USER"))
    const [edit,setEdit] = useState(false)
    const [selectedGender, setSelectedGender] = useState(userData.sex?userData.sex:'');
    const [selectedAge, setSelectedAge] = useState(userData.birth?userData.birth.split('T')[0]:"");
    const [phone,phoneValidation,setPhone,name,nameValidation,setName,email,emailValidation,setEmail,dni, setDNI, dniValidation] = useProfile();
    const set = ()=>{
        setPhone({value :userData.phone?userData.phone:"",er:''})
        setName({value :userData.name,er:''})
        setEmail({value :userData.email,er:''})
        setDNI({value :userData.dni?userData.dni:"",er:''})
    }
    const {log}= useUser("Guardando...","Guardado","Fallo en el guardado",'/Usuario/');

    const makeError = useError();

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('a')
        if (
            name.er==="" && email.er==="" && dni.er==="" && phone.er===""
          ){console.log('a')
            log({apiKey:userData.apiKey,email:userData.email,newEmail:email.value,name:name.value,dni:dni.value,sex:selectedGender,birth:selectedAge,phone:phone.value},"/Vintus/Users/Update");
          }
   
            
         };

    return(

        <>
        <h2>Perfil</h2>
        <form className="profile" onSubmit={(event)=>{submitHandler(event);setEdit(()=>!edit)}}>
            
            <article>
            <h5>Nombre</h5>
            {!edit? <p>{userData.name}</p>:
            <>
            <input type="text" value={name.value} placeholder={userData.name} onChange={(event)=>{nameValidation(event.target.value)}} />
            {name.er!=="" && name.er &&  <p  id="phone-number-error">{makeError(name.er)}</p>}
            </>
            }
            </article>

            <article>
            <h5>Email</h5>
            {!edit? <p>{userData.email}</p>:
            <>
            <input type="text" value={email.value} placeholder={userData.email} onChange={(event)=>{emailValidation(event.target.value)}} />
            {email.er!=="" && email.er &&  <p  id="phone-number-error">{makeError(email.er)}</p>}
            </>}

            </article>

            <article className="container">

            <div className="data">
            <h5>DNI</h5>
            {!edit? <p>{userData.dni}</p>:
            <>
            <input type="text" value={dni.value}  onChange={(event)=>{dniValidation(event.target.value)}} />
            {dni.er!=="" && dni.er &&  <p  id="phone-number-error">{makeError(dni.er)}</p>}
            </>
            }

            </div>

                <div>
            <h5>Genero</h5>
            {!edit? <p>{userData.sex}</p>:
    <select id="gender" value={selectedGender} onChange={(event)=> setSelectedGender(event.target.value)}>
        <option value="">Selecciona un género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
    </select>}

            </div>

            </article>

            <article className="container">

            <div>
            <h5>Fecha de Nacimiento</h5>
            {!edit? <p>{userData.birth.split('T')[0]}</p>:<input type="date" value={selectedAge} onChange={(event)=> setSelectedAge(event.target.value)}/>}

            </div>

            <div>
            <h5>Telefono</h5>
            {!edit? <p>{userData.phone}</p>:
            <>
            <input type="text" value={phone.value} placeholder={userData.phone} onChange={(event)=>{phoneValidation(event.target.value)}} />
            {phone.er!=="" && phone.er &&  <p  id="phone-number-error">{makeError(phone.er)}</p>}
            </>}

            </div>

            </article>

            {!edit?<button type="button" onClick={()=>{setEdit(()=>!edit);set()}}>Editar</button>:
            <div className="buttonDiv">
            <button onClick={()=>{setEdit(()=>!edit);set()}} className="cancel">Cancelar</button>
            <button type="submit">Editar</button>
            </div>
            }
            
        </form>
        </>
    )
}
export default UserProfile