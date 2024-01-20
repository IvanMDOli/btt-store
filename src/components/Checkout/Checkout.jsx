import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useFetch } from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Brief } from './Brief';
import Swal from 'sweetalert2';
import './checkout.scss'
import { UserContext } from '../../context/UserContext';


export const Checkout = () => {

    const [orderId, setOrderId] = useState(null);

    const [formData, setFormData] = useState(null);

    const { cart, totalCart, clearCart } = useContext(CartContext);

    const { user } = useContext(UserContext)

    const [locFilter, setLocFilter] = useState(user.province || '');
    
    const { data: prov } = useFetch(`https://apis.datos.gob.ar/georef/api/provincias`, [true]);
    const { data: loc } = useFetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${locFilter}&max=999`, [locFilter]);

    const provSelected = (e, setFieldValue) => {
        const selectedValue = e.target.value;
        setFieldValue("province", selectedValue);
        setLocFilter(selectedValue);
        };

    const validate = (values) => {
        const errors = {}

        if(values.email != values.email2) errors.email = "The emails have to be the same."

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
            addDoc(ordersRef, orden)
                .then((doc) => {
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
                    name: (user.name || ''),
                    lastname: (user.lastname || ''),
                    document: (user.document || ''),
                    phone: (user.phone || ''),
                    province: (user.province || ''),
                    locality: (user.locality || ''),
                    address: (user.address || ''),
                    cp: (user.cp || ''),
                    email : (user.email || ''),
                    email2 : ''
                }}
                onSubmit={handleSubmit}
                validate={ validate }
            >
                {(formikProps) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" placeholder="Introduce your name"/>
                        <label htmlFor="lastname">Lastname</label>
                        <Field id="lastname" name="lastname" type="text" placeholder="Introduce your lastname"/>
                        <label htmlFor="document">Document</label>
                        <Field id="document" name="document" type="number" placeholder="Introduce your document number"/>
                        <label htmlFor="phone">Phone</label>
                        <Field id="phone" name="phone" type="number" placeholder="Introduce your phone number"/>
                        <label htmlFor="province">Province</label>
                        <Field id="province" onChange={(e) => provSelected(e, formikProps.setFieldValue)} name="province" as="select" >
                            <option value="" disabled hidden>Choose a province</option>
                            {prov && prov.provincias &&
                                prov.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((e) => 
                                    <option key={e.id} value={e.nombre} >{e.nombre}</option>
                                )
                            }
                        </Field>
                        <label htmlFor="locality">Locality</label>
                        <Field id="locality" name="locality" as="select" >
                            <option value="" disabled hidden>Choose a locality</option>
                            {loc && loc.localidades &&
                                loc.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((e) => 
                                <option key={e.id} value={e.nombre}>{e.nombre}</option>
                                )
                            }
                        </Field>
                        <label htmlFor="address">Address</label>
                        <Field id="address" name="address" type="text" placeholder="Introduce your address"/>
                        <label htmlFor="cp">Postal code</label>
                        <Field id="cp" name="cp" type="number" placeholder="Introduce your postal code"/>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" placeholder="Introduce your email"/>
                        <ErrorMessage component="span" className='errors' name="email" />
                        <label htmlFor="email2">Confirm Email</label>
                        <Field id="email2" name="email2" type="email" placeholder="Confirm your email"/>
                        <button className='checkout-button' type='submit'>Finish shopping</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
