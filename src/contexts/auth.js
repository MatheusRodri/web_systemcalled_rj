import { useState, createContext,useEffect} from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    async function loadUser(){
        const storageUser = localStorage.getItem("@userLocal");

        if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }
        setLoading(false);
    }
    loadUser();
  },[])


  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password).then(
      async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          name: docSnap.data().name,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    ).catch((error)=>{
        console.log(error);
        setLoadingAuth(false);
        toast.error("Invalid email or password!");
    });
  }

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        let docRef = doc(db, "users", uid);
        let data = {
          name: name,
          avatarUrl: null,
        };

        await setDoc(docRef, data).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Welcome to the system!");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@userLocal", JSON.stringify(data));
  }

  async function logout(){
    await signOut(auth);
    localStorage.removeItem('@userLocal');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
        loading,
        signIn,
        signUp,
        logout,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
