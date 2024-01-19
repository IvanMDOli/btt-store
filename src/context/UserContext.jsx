import { createContext, useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase/config'
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import { addDoc, collection, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore'


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
            .then((userCredential) => {

                const q = query(userRef, where("uid", "==", userCredential.user.uid));
        
                getDocs(q) 
                    .then((docSnapshot) => {
                        const userData = docSnapshot.docs[0].data();
                        setUser({
                            uid: userCredential.user.uid,
                            logged: true,
                            name: userData.name,
                            lastname: userData.lastname,
                            email: userData.email,
                        });
                        Swal.fire("Bienvenido!");
                    })
            })

            .catch((error) =>{
                Swal.fire("Email o Contraseña incorrectos");
                console.error("Error: ", error.message)
            })
    };

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {

                const user = {
                    uid: userCredential.user.uid,
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
                setUser(prevUser => ({
                    ...prevUser,
                    logged: true
                }));
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
