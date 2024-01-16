import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './checkout.scss'
import { useFetch } from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Brief } from './Brief';

export const Checkout = () => {

    const [orderId, setOrderId] = useState(null);

    const [formData, setFormData] = useState(null);

    const { cart, totalCart, clearCart } = useContext(CartContext);

        const [locFilter, setLocFilter] = useState('');
        
        const { data: prov } = useFetch(`https://apis.datos.gob.ar/georef/api/provincias`, [true]);
        const { data: loc } = useFetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${locFilter}&max=999`, [locFilter]);

    const provSelected = (e, setFieldValue) => {
        const selectedValue = e.target.value;
        setFieldValue("provincia", selectedValue);
        setLocFilter(selectedValue);
        };

    const validate = (values) => {
        const errors = {}

        if(values.email != values.email2) errors.email = "Los emails tienen que coincidir."

        return errors;
    }

    const handleSubmit = async (e) => {

        const clientInfo = e

        const orden = {
            cliente: clientInfo,
            items: cart,
            total: totalCart(),
            fecha: new Date(),
        };

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders");
        const productsRef = collection(db, "items");
        const itemsQuery = query(productsRef, where( documentId(), 'in', cart.map(prod => prod.id) ))
        
        const querySnapshot = await getDocs(itemsQuery)

        querySnapshot.docs.forEach(doc => {
            
            const item = cart.find(prod => prod.id === doc.id)
            const stock = doc.data().stock

            if (stock >= item.count) {
                batch.update(doc.ref, {
                    stock: stock - item.count
                })
            }
        })

        batch.commit()
        .then(() => {
            addDoc(ordersRef, orden).then((doc) => {
                setOrderId(doc.id)
                clearCart()

                setFormData(e);
        
                Swal.fire("Gracias por tu compra!")
            });
        })
    }

    if (orderId) {
        return (
            <Brief formData={formData} orderId={orderId}/>
        );
    }

    return (
        <div className='checkout-main'>
            <h1>FINALIZAR COMPRA</h1>
            <Formik
                initialValues={{
                    nombre: '',
                    apellido: '',
                    documento: '',
                    telefono: '',
                    provincia: '',
                    localidad: '',
                    direccion: '',
                    cp: '',
                    email : '',
                    email2 : ''
                }}
                onSubmit={handleSubmit}
                validate={ validate }
            >
                {(formikProps) => (
                    <Form>
                        <label htmlFor="nombre">Nombre</label>
                        <Field id="nombre" name="nombre" type="text" placeholder="Introduzca su nombre"/>
                        <label htmlFor="apellido">Apellido</label>
                        <Field id="apellido" name="apellido" type="text" placeholder="Introduzca su apellido"/>
                        <label htmlFor="documento">Documento</label>
                        <Field id="documento" name="documento" type="number" placeholder="Introduzca su número de documento"/>
                        <label htmlFor="telefono">Telefono</label>
                        <Field id="telefono" name="telefono" type="number" placeholder="Introduzca su número de telefono"/>
                        <label htmlFor="provincia">Provincia</label>
                        <Field id="provincia" onChange={(e) => provSelected(e, formikProps.setFieldValue)} name="provincia" as="select" >
                            <option value="" disabled hidden>Elija una provincia</option>
                            {prov && prov.provincias &&
                                prov.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((e) => 
                                    <option key={e.id} value={e.nombre} >{e.nombre}</option>
                                )
                            }
                        </Field>
                        <label htmlFor="localidad">Localidad</label>
                        <Field id="localidad" name="localidad" as="select" >
                            <option value="" disabled hidden>Elija una localidad</option>
                            {loc && loc.localidades &&
                                loc.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((e) => 
                                <option key={e.id} value={e.nombre}>{e.nombre}</option>
                                )
                            }
                        </Field>
                        <label htmlFor="direccion">Dirección</label>
                        <Field id="direccion" name="direccion" type="text" placeholder="Introduzca su direccion"/>
                        <label htmlFor="cp">Código postal</label>
                        <Field id="cp" name="cp" type="number" placeholder="Introduzca su código postal"/>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" placeholder="Introduzca su email"/>
                        <ErrorMessage component="span" className='errors' name="email" />
                        <label htmlFor="email2">Confirmar Email</label>
                        <Field id="email2" name="email2" type="email" placeholder="Confirme su email"/>
                        <button className='checkout-button' type='submit'>Finalizar Compra</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
