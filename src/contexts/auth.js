import { useState,createContext,useEffect } from "react";
import {auth,db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc,getDoc,setDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

export const AuthContext = createContext({});

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const navigate = useNavigate();

    function signIn(email,password){
        console.log(email,password);
    }

    async function signUp(name,email,password){
        
        setLoadingAuth(true);
        
        await createUserWithEmailAndPassword(auth,email,password)
        .then( async (value)=>{
            let uid = value.user.uid;

            let docRef = doc(db,'users',uid);
            let data = {
                name:name,
                avatarUrl:null
            }

            await setDoc(docRef,data).then(()=>{
               let data = {
                    uid:uid,
                    name:name,
                    email:value.user.email,
                    avatarUrl:null
               };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Welcome to the system!');
                navigate('/dashboard');
                
            })
        })
        .catch((error)=>{
            console.log(error);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('@userLocal',JSON.stringify(data));
    }




    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}