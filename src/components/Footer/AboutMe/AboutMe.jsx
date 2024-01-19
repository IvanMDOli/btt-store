import React from 'react'
import fotoMia from '../../../assets/foto-mia.jpg'
import './aboutme.scss'
import { Icon } from '@iconify/react';


export const AboutMe = () => {
  return (
    <div className='aboutme-main'>
        <h2>Iván De oli</h2>
        <img src={fotoMia} alt='Foto Iván De oli' />
        <p>Tengo 25 años, soy de Buenos Aires y hace 5 años conocí el mundo del front-end. 
          En 2020 hice un bootcamp en Accenture en donde me enseñaron como desarrollar un sitio web con
          HTML, CSS y JS. En 2021 empecé a trabajar en Accenture, donde me encuentro trabajando actualmente,
          pero no en un area de desarrollo, por lo que seguí capacitandome por mi cuenta con el objetivo de 
          conseguir un trabajo mas acorde a lo que busco. Ahora me encuetro aprendiendo React y mi objetivo es 
          seguir con esta tecnología.
        </p>
        <div className='aboutme-icons'>
          <h3>Tecnologías aprendidas</h3>
          <Icon icon="vscode-icons:file-type-html" width="50" height="50" />
          <Icon icon="vscode-icons:file-type-css" width="50" height="50" />
          <Icon icon="vscode-icons:file-type-js-official" width="50" height="50" />
          <Icon icon="skill-icons:react-dark" width="50" height="50" />
          <Icon icon="skill-icons:sass" width="50" height="50" />
          <Icon icon="skill-icons:bootstrap" width="50" height="50" />
          <Icon icon="skill-icons:tailwindcss-dark" width="50" height="50" />
          <Icon icon="logos:firebase" width="50" height="50" />
          <Icon icon="skill-icons:nodejs-dark" width="50" height="50" />
          <Icon icon="logos:npm-icon" width="50" height="50" />
        </div>
    </div>
  )
}