import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './checkout.scss'
import { useFetch } from '../../hooks/useFetch';

export const Checkout = () => {

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        documento: '',
        telefono: '',
        provincia: '',
        localidad: '',
        direccion: '',
        cp: '',
        email : ''
    })

    const [orderId, setOrderId] = useState(null);
    const [locFilter, setLocFilter] = useState(null);

    const { cart, totalCart, clearCart } = useContext(CartContext);

    const { data: prov } = useFetch(`https://apis.datos.gob.ar/georef/api/provincias`, [true])
    const { data: loc } = useFetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${locFilter}&max=999`, [locFilter])

    const handleChange = (e) => {

        if(e.target.name == 'provincia') {
            setLocFilter(e.target.value)
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value,
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const orden = {
            cliente: form,
            items: cart,
            total: totalCart(),
            fecha: new Date(),
        };

        const ordersRef = collection(db, "orders");

        addDoc(ordersRef, orden).then((doc) => {
            setOrderId(doc.id)
            clearCart()
    
            Swal.fire("Gracias por tu compra!")
        });
    }

    if (orderId) {
        return (
            <div className="compra-finalizada">
                <h2>Gracias por tu compra</h2>
                <hr />
                <div className='info-compra'>
                    <h3>Información de compra</h3>
                    <div className='info-compra-datos'>
                        <h4>{form.nombre} {form.apellido}</h4>
                        <p>N° Documento: {form.documento}</p>
                        <h5>Información de contacto</h5>
                        <p>N° de Teléfono: {form.telefono}</p>
                        <p>Email: {form.email}</p>
                        <h5>Información para la entrega</h5>
                        <p>{form.provincia}, {form.localidad}</p>
                        <p>Dirección: {form.direccion}</p>
                        <p>Código postal: {form.cp}</p>
                    </div>
                </div>
                <h3>Tu código de orden es:</h3>
                <h3>{orderId}</h3>
            </div>
        );
    }

    return (
        <div className='checkout-main'>
            <h1>FINALIZAR COMPRA</h1>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor='Nombre'>Nombre</label>
                <input 
                    onChange={handleChange} 
                    name="nombre" 
                    placeholder='Ingresa tu nombre' 
                    type="text" 
                    value={form.nombre}
                    id='Nombre' 
                />
                <label htmlFor='Apellido'>Apellido</label>
                <input 
                    onChange={handleChange} 
                    name="apellido" 
                    placeholder='Ingresa tu apellido' 
                    type="text" 
                    value={form.apellido}
                    id='Apellido' 
                />
                <label htmlFor='Documento'>Documento</label>
                <input 
                    onChange={handleChange} 
                    name="documento" 
                    placeholder='Ingresa tu número de documento' 
                    type="number" 
                    value={form.documento}
                    id='Documento' 
                />
                <label htmlFor='Telefono'>Telefono</label>
                <input 
                    onChange={handleChange} 
                    name="telefono" 
                    placeholder='Ingresa tu número de telefono' 
                    type='number' 
                    value={form.telefono}
                    id='Telefono' 
                />
                <label htmlFor='Provincia'>Provincia</label>
                <select name='provincia' onChange={handleChange}>
                    <option value=''>- Elija una provincia -</option>
                    {prov &&
                        prov.provincias.map((e) => 
                            <option key={e.id} value={e.nombre} >{e.nombre}</option>
                        )
                    }
                </select>
                <label htmlFor='Localidad'>Localidad</label>
                <select name='localidad' onChange={handleChange}>
                    <option value=''>- Primero elija una provincia -</option>
                    {locFilter &&
                        loc.localidades.map((e) => 
                        <option key={e.id} value={e.nombre}>{e.nombre}</option>
                    )
                    }
                </select>
                <label htmlFor='Dirección'>Dirección</label>
                <input 
                    onChange={handleChange} 
                    name="direccion" 
                    placeholder='Ingresa tu dirección' 
                    type="text" 
                    value={form.direccion}
                    id='Dirección'
                />
                <label htmlFor='cp'>Código Postal</label>
                <input 
                    onChange={handleChange} 
                    name="cp" 
                    placeholder='Ingresa tu código postal' 
                    type="number" 
                    value={form.cp}
                    id='cp'
                />
                <label htmlFor='Email'>Email</label>
                <input 
                    onChange={handleChange} 
                    name="email" 
                    placeholder='Ingresa tu email' 
                    type="email" 
                    value={form.email}
                    id='Email'
                />
                <button className='checkout-button' type='submit'>Confirmar Datos</button>
            </form>
        </div>
    )
}
