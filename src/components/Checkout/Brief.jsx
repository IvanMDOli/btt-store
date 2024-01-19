import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css'
import './checkout.scss'


export const Brief = ({ formData, orderId }) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId)

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="compra-finalizada">
            <h2>Gracias por tu compra</h2>
            <hr />
            <div className='info-compra'>
                <h3>Información de compra</h3>
                <div className='info-compra-datos'>
                    <h4>{formData.nombre} {formData.apellido}</h4>
                    <p>N° Documento: {formData.documento}</p>
                    <h5>Información de contacto</h5>
                    <p>N° de Teléfono: {formData.telefono}</p>
                    <p>Email: {formData.email}</p>
                    <h5>Información para la entrega</h5>
                    <p>{formData.provincia}, {formData.localidad}</p>
                    <p>Dirección: {formData.direccion}</p>
                    <p>Código postal: {formData.cp}</p>
                </div>
            </div>
            <div className='orderInfo'>
                <h2>Tu código de orden es:</h2>
                <h3>{orderId}</h3>
                <Icon 
                    onClick={handleCopy} 
                    icon="uil:copy" 
                    width="25" 
                    height="25" 
                    color="rgb(44, 44, 44)" 
                    data-tooltip-content={copied ? '¡Código copiado!' : 'Copiar código'}
                    data-tooltip-id="copyTooltip"
                />
                <Tooltip
                        id="copyTooltip"
                        effect="solid"
                        place="top"
                    />
                <Link className='consultar-orden' to={'/orders'}>Consultar orden de compra</Link>
            </div>
        </div>
    )
}
