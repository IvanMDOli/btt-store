import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Icon } from '@iconify/react';
import { USDollar } from '../../../utils/utils';
import Swal from 'sweetalert2';
import './orders.scss'


export const Orders = () => {

    const [searchOrder, setSearchOrder] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('__name__', '==', values.orderId));

            const querySnapshot = await getDocs(q);

            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, data: doc.data() });
            });

            if(results.length > 0){
                setSearchOrder(results);
            }
            else {
                Swal.fire('No encontramos ninguna orden con este código :(')
                setSearchOrder([])
            }
        } 
        catch (error) {
            Swal.fire('No se introdujo ningún código')
        }
        setLoading(false)
    };

    return (
        <div className='order-container'>
            <h2>Consulta tu orden de compra:</h2>
            <hr />
            <Formik 
            initialValues={{
                orderId: ''
            }}
            onSubmit={handleSubmit}>
                <Form>
                    <Field name='orderId'  type="text" placeholder='Ingrese su código de orden' />
                    <button type='submit'>Buscar</button>
                </Form>
            </Formik>

            {loading 
                ?   <div className='loading-icon'>
                        <Icon icon="svg-spinners:clock" width="50" height="50" vFlip={true} /> 
                    </div>
                : (
                    <div className='order-info'>
                        <h2>{searchOrder.length > 0 ?'Resultado de la búsqueda:' : 'Sin resultados'}</h2>
                        <ul>
                            {searchOrder.map((result) => (
                                <li key={result.id}>
                                    <h3>Orden ID: {result.id}</h3>
                                    <hr />
                                    <div className='order-details'>
                                        <h4>Nombre: {result.data.cliente.apellido} {result.data.cliente.nombre}</h4>
                                        <h5>Documento: {result.data.cliente.documento}</h5>
                                        <h5>Teléfono: {result.data.cliente.telefono}</h5>
                                    </div>
                                    <hr />
                                    <div className='order-details'>
                                        <h4>Provincia: {result.data.cliente.provincia} {result.data.cliente.nombre}</h4>
                                        <h5>Localidad: {result.data.cliente.localidad}</h5>
                                        <h5>Dirección: {result.data.cliente.direccion}</h5>
                                        <h5>Código postal: {result.data.cliente.cp}</h5>
                                    </div>
                                    <h2>Productos encargados</h2>
                                    {result.data.items.map((item) => (
                                        <div className='order-items-details' key={item.id}>
                                        
                                            <h3>{item.name} Categoría: {item.category}</h3>
                                            <p>{item.description}</p>
                                            <img src={item.img} alt={item.name} />
                                            <h4>Precio: {USDollar.format(item.price)}</h4>
                                            <h4>Cantidad: {item.count}</h4>
                                            <h3>TOTAL POR ITEM: {USDollar.format(item.price * item.count)}</h3>
                                            <hr />
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                        {searchOrder.length > 0 && (<h2>TOTAL DE LA ORDEN: {USDollar.format(searchOrder[0].data.total)}</h2>)}
                    </div>
                )
            }
        </div>
    )
}
