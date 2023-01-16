import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { useContext, useState } from "react";
import "./profile.css";
import {db,storage} from "../../services/firebaseConnection";
import {doc,updateDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e){
    if(e.target.files[0]){
        const image =  e.target.files[0];
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }else{
            alert('Send image of type PNG or JPEG')
            setImageAvatar(null);
            return;
        }
    }
  }

  async function handleUpload(){
    const currentUid = user.uid;

    const uploadRef = ref(storage,`images/${currentUid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef,imageAvatar)
    .then((snapshot)=>{
        getDownloadURL(snapshot.ref).then(async (downloadURL)=>{
            let urlPhoto = downloadURL;

            const docRef = doc(db,"users",currentUid);

            await updateDoc(docRef,{
                avatarUrl:urlPhoto,
                name:name
            }).then(()=>{
                let data = {
                    ...user,
                    name:name,
                    avatarUrl:urlPhoto
                }
                setUser(data);
                storageUser(data);
                toast.success('Profile updated successfully');
            })
        })
    })
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(imageAvatar === null && name !== ''){
        const docRef = doc(db,"users",user.uid);

        await updateDoc(docRef,{
            name:name
        })
        .then(()=>{
            let data = {
                ...user,
                name:name,
            }
            setUser(data);
            storageUser(data);
            toast.success('Profile updated successfully');
        })

    }else if(name !== '' && imageAvatar !== null){
        const docRef = doc(db,"users",user.uid);
        let urlAvatar = await handleUpload();

        await updateDoc(docRef,{
            name:name,
            avatarUrl:urlAvatar
        })
        .then(()=>{
            let data = {
                ...user,
                name:name,
                avatarUrl:urlAvatar
            }
            setUser(data);
            storageUser(data);
            toast.success('Profile updated successfully');
        })
    }
  }

  return (
    <div>
      <Header />
      <div className={"content"}>
        <Title name={"My accountant"}>
          <FiSettings size={25} />
        </Title>

        <div className={"container"}>
          <form className={"form-profile"} onSubmit={handleSubmit}>
            <label className={"label-avatar"}>
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type={"file"} accept="image/*" onChange={handleFile} /> <br />
              {avatarUrl == null ? (
                <img
                  src={avatar}
                  width={"250px"}
                  height={"250px"}
                  alt={"Avatar"}
                />
              ) : (
                <img
                  src={avatarUrl}
                  width={"250px"}
                  height={"250px"}
                  alt={"Avatar"}
                />
              )}
            </label>

            <label>Name</label>
            <input
              value={name}
              onChange={(text) => setName(text.target.value)}
              type={"text"}
              placeholder="Your name"
            />

            <label>Email</label>
            <input
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              type={"email"}
              placeholder="Your e-mail"
              disabled={true}
            />

            <button type={"submit"}>Save</button>
          </form>
        </div>

        <div className="container">
          <button onClick={()=>logout()} className="logout-btn">Exit</button>
        </div>
      </div>
    </div>
  );
}
