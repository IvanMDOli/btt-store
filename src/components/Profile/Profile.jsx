import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import './profile.scss'
import { Field, Form, Formik } from 'formik'
import { useFetch } from '../../hooks/useFetch'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export const Profile = () => {

  const { user, logout, updateUserDataInState } = useContext(UserContext)

  const navigate = useNavigate()
  
  const [locFilter, setLocFilter] = useState(user.province || '');

  const [editProfile, setEditProfile] = useState(false)

  const { data: prov } = useFetch(`https://apis.datos.gob.ar/georef/api/provincias`, [true]);
  const { data: loc } = useFetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${locFilter}&max=999`, [locFilter]);

  const provSelected = (e, setFieldValue) => {
    const selectedValue = e.target.value;
    setFieldValue("province", selectedValue);
    setLocFilter(selectedValue);
  };

  const handleSubmit = async (e) => {
    
    const userDocRef = collection(db, 'users');
    const q = query(userDocRef, where("uid", "==", user.uid))
    const querySnapshot = await getDocs(q);

    try {
      const userDoc = querySnapshot.docs[0];
      const userInfo = e;

      await updateDoc(userDoc.ref, userInfo)
      Swal.fire('Usuario actualizado correctamente');

      const updatedUser = { ...user, ...userInfo};
      updateUserDataInState(updatedUser);

    } 
    catch (error) {
      Swal.fire('Error al actualizar usuario')
      console.error('Error al actualizar usuario:', error);
    }
    setEditProfile(!editProfile)
  }


  if(editProfile) {
    return (
      <div className='profile-container'>
        <h1>PROFILE</h1>
        <div className='userinfo'>
          <Formik
            initialValues={{
              name: user.name || '',
              lastname: user.lastname || '',
              document: user.document || '',
              phone: user.phone || '',
              province: user.province || '',
              locality: user.locality || '',
              address: user.address || '',
              cp: user.cp || '',
              email : user.email || ''
          }}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" type="text" placeholder={user.name || "Introduce your name"}/>
                <label htmlFor="lastname">Lastname</label>
                <Field id="lastname" name="lastname" type="text" placeholder={user.lastname || "Introduce your lastname"}/>
                <label htmlFor="document">Document</label>
                <Field id="document" name="document" type="number" placeholder={user.document || "Introduce your document number"}/>
                <label htmlFor="phone">Phone</label>
                <Field id="phone" name="phone" type="number" placeholder={user.phone || "Introduce your phone number"}/>
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
                <Field id="address" name="address" type="text" placeholder={user.address || "Introduce your address"}/>
                <label htmlFor="cp">Postal code</label>
                <Field id="cp" name="cp" type="number" placeholder={user.cp || "Introduce your postal code"}/>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" placeholder={user.email || "Introduce your email"}/>
                <button type='submit'>Save</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      )
  }

  return (
    <div className='profile-container'>
      <h1>PROFILE</h1>
      <div className='userinfo'>
        <h2>{user.name} {user.lastname}</h2>
        <div>
          <p><b>Document: </b>{user.document || '...'}</p>
          <p><b>Phone: </b>{user.phone || '...'}</p>
          <p><b>Email: </b>{user.email || '...'}</p>
          <p><b>Province: </b>{user.province || '...'}</p>
          <p><b>Locality: </b>{user.locality || '...'}</p>
          <p><b>Adress: </b>{user.address || '...'}</p>
          <p><b>Postal Code: </b>{user.cp || '...'}</p>
        </div>
        <button type='button' onClick={() => setEditProfile(!editProfile)}>Edit</button>
      </div>
      <button className='logout' onClick={logout}>Sign Off</button>
    </div>
  )
}
