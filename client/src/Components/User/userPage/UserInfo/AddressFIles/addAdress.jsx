import { useState } from "react";
import useInput from "../../../../../Hooks/use-Input"; 
import useUser from "../../../../../Hooks/useUser";
const AddAddress  = ({setAdd , add})=>{
    const userData = JSON.parse(localStorage.getItem("USER"))
    const [cPostal,setCPostal,cPostalValidation]=useInput(
        (content)=>{    
            let message = '';
            if (content === '') {
              message = 'Codigo postal es obligatorio';
            } else if (!/^\d{4}$/.test(content)) {
              message = 'Codigo postal son 4 digitos ';
            }
            return message;
          }
    ,'');
    const argentineanProvinces = [
        'Buenos Aires',
        'Catamarca',
        'Chaco',
        'Chubut',
        'Córdoba',
        'Corrientes',
        'Entre Ríos',
        'Formosa',
        'Jujuy',
        'La Pampa',
        'La Rioja',
        'Mendoza',
        'Misiones',
        'Neuquén',
        'Río Negro',
        'Salta',
        'San Juan',
        'San Luis',
        'Santa Cruz',
        'Santa Fe',
        'Santiago del Estero',
        'Tierra del Fuego',
        'Tucumán',
      ];
      const [calle, setCalle] = useState('');
      const [numero, setNumero] = useState('');
      const [departamento, setDepartamento] = useState('');
      const [selectedProvince, setSelectedProvince] = useState('');
      const {log}= useUser("Guardando...","Guardado","Fallo en el guardado",'/Usuario/Direcciones');
    
      const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
      };
    
      const handleCalleChange = (event) => {
        setCalle(event.target.value);
      };
    
      const handleNumeroChange = (event) => {
        setNumero(event.target.value);
      };
    
      const handleDepartamentoChange = (event) => {
        setDepartamento(event.target.value);
      };
      const submitHandler = (event) => {
        event.preventDefault();
        console.log('a')
        if (
            cPostal.er===""
          ){console.log('a')
            log({apiKey:userData.apiKey,email:userData.email,address:{postalCode:cPostal.value,street:calle,number:numero,province:selectedProvince,apartment:departamento}},"/Vintus/Users/Address");
          }
   
            
         };
    
        return(<>
            <article className="addresSection">
                <h2>Agregar Direccione</h2>
                <button onClick={()=>{setAdd(()=>!add)}}>Cancelar</button>
            </article>
            <article className="formArt">
                <form action="" onSubmit={(event)=>{submitHandler(event);setAdd()}}>
                <select required value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Seleccione una probincia</option>
                    {argentineanProvinces.map((province, index) => (
                    <option key={index} value={province}>
                    {province}
                    </option>
                                ))}
                </select>
                <input required type="number" value={cPostal.value} placeholder={'Codigo Postal'} onChange={(event)=>{cPostalValidation(event.target.value)}} />
                {cPostal.er!=="" && cPostal.er &&  <p  id="phone-number-error">{cPostal.er}</p>}
                <input required type="text" placeholder="Calle" value={calle} onChange={handleCalleChange}
                />

                <input required type="number" placeholder="Numero" value={numero} onChange={handleNumeroChange}
                />

                <input type="text" placeholder="Numero de Departamento" value={departamento} onChange={handleDepartamentoChange}
                />
                <button type="submit">Agregar</button>
                </form>

            </article></>
        )
    }
    export default AddAddress