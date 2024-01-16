import { createContext, useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase/config'
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import { addDoc, collection, getDocs, query, where, writeBatch } from 'firebase/firestore'

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState({
        name: null,
        lastname: null,
        email: null,
        uid: null,
        logged: false
    })

    const batch = writeBatch(db)
    const userRef = collection(db, "users");

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
    };

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {

                const userCred = userCredential.user;

                setUser({
                    uid: userCred.uid,
                    logged: true,
                    name: values.name,
                    lastname: values.lastname,
                    email: values.email
                });

                const user = {
                    uid: userCred.uid,
                    name: values.name,
                    lastname: values.lastname,
                    email: values.email
                }

                batch.commit()
                    .then(() => {
                        addDoc(userRef, user)
                    Swal.fire("Usuario Creado")
                })
            })

            .catch((error) => {
                console.error("Error al crear usuario:", error.message);
            });
    }

    const logout = () => {
        signOut(auth)
    }

    const googleLogin = () => {
        signInWithPopup(auth, provider)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {

            if (authUser) {
                setUser({
                    email: authUser.email,
                    uid: authUser.uid,
                    logged: true
                })
            }
            else {
                setUser({
                    name: null,
                    lastname: null,
                    email: null,
                    uid: null,
                    logged: false
                })
            }
        })

    }, [])


  return (
    <UserContext.Provider value={{user, login, register, logout, googleLogin}}>
        {children}
    </UserContext.Provider>
  )
}
