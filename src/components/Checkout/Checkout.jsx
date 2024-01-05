import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const Checkout = () => {

    const { cart, totalCart, clearCart } = useContext(CartContext);

    const [form, setForm] = useState({
        nombre: '',
        direccion: '',
        email : ''
    })

    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        console.log(e.target.value)
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
            <div className="">
                <h2 className="">Gracias por tu compra</h2>
                <hr />
                <p>Tu código de orden es: {orderId}</p>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <input onChange={handleChange} name="nombre" placeholder='Nombre' type="text" value={form.nombre} />
                <input onChange={handleChange} name="direccion" placeholder='Dirección' type="text" value={form.direccion} />
                <input onChange={handleChange} name="email" placeholder='Email' type="email" value={form.email} />
                <button type='submit'>Confirmar Datos</button>
            </form>
        </div>
    )
}
