import { createContext, useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase/config'
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import { addDoc, collection, getDocs, query, where, writeBatch } from 'firebase/firestore'


export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const initialState = {
        name: null,
        lastname: null,
        document: null,
        phone: null,
        province: null,
        locality: null,
        address: null,
        cp: null,
        email: null,
        logged: false,
    };

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : initialState;
    });

    const batch = writeBatch(db)
    const userRef = collection(db, "users");

    const updateUserDataInState = (userData) => {
        setUser({
            uid: userData.uid,
            name: userData.name,
            lastname: userData.lastname,
            document: userData.document,
            phone: userData.phone,
            province: userData.province,
            locality: userData.locality,
            address: userData.address,
            cp: userData.cp,
            email: userData.email,
            logged: true
        });
        sessionStorage.setItem('user', JSON.stringify({...userData, logged: true}));
    };
    
    const login = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            fetchUserDataAndUpdateState(userCredential.user);
        } 
        catch (error) {
            Swal.fire("Datos inválidos");
            console.error("Error al iniciar sesión:", error.message);
        }
    };
    
    const fetchUserDataAndUpdateState = async (authUser) => {
        try {
            const q = query(userRef, where("uid", "==", authUser.uid));
            const docSnapshot = await getDocs(q);
            const userData = docSnapshot.docs[0].data();

            updateUserDataInState(userData);
            Swal.fire("Bienvenido!");

        } 
        catch (error) {
            console.error("Error al obtener datos de usuario:", error.message);
        }
    };

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {

                const user = {
                    document: null,
                    phone: null,
                    province: null,
                    locality: null,
                    address: null,
                    cp: null,
                    uid: userCredential.user.uid,
                    name: values.name,
                    lastname: values.lastname,
                    email: values.email
                }

                updateUserDataInState(user)

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

    const logout =  () => {
        signOut(auth)
        sessionStorage.removeItem('user');
    }

    const googleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider)
            fetchUserDataAndUpdateState(userCredential.user);
        }
        catch (error) {
            console.log('Error al loguear: ', error)
        }
    }

    useEffect(() => {
        const fetchUserData = async (authUser) => {
          try {
            const q = query(userRef, where('uid', '==', authUser.uid));
            const docSnapshot = await getDocs(q);
    
            const userData = docSnapshot.docs[0].data();
    
            updateUserDataInState(userData);
            Swal.fire('Bienvenido!');
          } catch (error) {
            console.error('Error al obtener datos de usuario:', error.message);
          }
        };
    
        const handleAuthStateChange = (authUser) => {
          if (authUser) {
            fetchUserData(authUser);
          } else {
            setUser(initialState);
          }
        };
    
        onAuthStateChanged(auth, handleAuthStateChange);
      }, []);


  return (
    <UserContext.Provider value={{user, login, register, logout, googleLogin, updateUserDataInState}}>
        {children}
    </UserContext.Provider>
  )
}
