
import { useState, useEffect, useContext  } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle} from 'react-icons/fi'

import {AuthContext} from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'

import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import './new.css';

const listRef = collection(db, "customers");

export default function New(){
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complement, setComplement] = useState('')
  const [subject, setSubject] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [idCustomer, setIdCustomer] = useState(false)
  

  useEffect(() => {
    async function loadCustomers(){
      await getDocs(listRef)
      .then( (snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            fantasyName: doc.data().fantasyName
          })
        })

        if(snapshot.docs.size === 0){
          alert("None company found");
          setCustomers()
          setLoadCustomer(false);
          return;
        }

        setCustomers(list);
        setLoadCustomer(false);

        if(id){
          loadId(list);
        }

      })
      .catch((error) => {
        console.log("Error to search a company", error)
        setLoadCustomer(false);
      
      })
    }

    loadCustomers();    
  }, [id])


  async function loadId(lista){
    const docRef = doc(db, "request", id);
    await getDoc(docRef)
    .then((snapshot) => {
      setSubject(snapshot.data().subject)
      setStatus(snapshot.data().status)
      setComplement(snapshot.data().complement);


      let index = lista.findIndex(item => item.id === snapshot.data().clientId)
      setCustomerSelected(index);
      setIdCustomer(true);

    })
    .catch((error) => {
      console.log(error);
      setIdCustomer(false);
    })
  }


  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleChangeSelect(e){
    setSubject(e.target.value)
  }

  function hnadleChangeCustomer(e){
    setCustomerSelected(e.target.value)
    console.log(customers[e.target.value].fantasyName);
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idCustomer){
      
      const docRef = doc(db, "request", id)
      await updateDoc(docRef, {
        client: customers[customerSelected].fantasyName,
        clienteId: customers[customerSelected].id,
        subject: subject,
        complement: complement,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.info("Update successfully!")
        setCustomerSelected(0);
        setComplement('');
        navigate('/dashboard')
      })
      .catch((error) => {
        toast.error("Ops error to update, try again later!")
        console.log(error);
      })

      return;
    }


    //Registrar um chamado
    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      client: customers[customerSelected].fantasyName,
      clientId: customers[customerSelected].id,
      subject: subject,
      complement: complement,
      status: status,
      userId: user.uid,
    })
    .then(() => {
      toast.success("Request registered successfully!")
      setComplement('')
      setCustomerSelected(0)
    })
    .catch((error) => {
      toast.error("Ops error to register, try again later!")
      console.log(error);
    })
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name={id ? "Editing request" : "New request"}>
          <FiPlusCircle size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>

            <label>Client</label>
            {
              loadCustomer ? (
                <input type="text" disabled={true} value="Loading..." />
              ) : (
                <select value={customerSelected} onChange={hnadleChangeCustomer}>
                  {customers.map((item, index) => {
                    return(
                      <option key={index} value={index}>
                        {item.fantasyName}
                      </option>
                    )
                  })}
                </select>
              )
            }

            <label>Subject</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value="Support">Support</option>
              <option value="Technical visit">Technical visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Open"
                onChange={handleOptionChange}
                checked={ status === 'open' }
              />
              <span>Open</span>

              <input
                type="radio"
                name="radio"
                value="Progress"
                onChange={handleOptionChange}
                checked={ status === 'Progress' }
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Closed"
                onChange={handleOptionChange}
                checked={ status === 'Closed' }
              />
              <span>Closed</span>
            </div>


            <label>Complement</label>
            <textarea
              type="text"
              placeholder="Describe your request"
              value={complement}
              onChange={ (e) => setComplement(e.target.value) }
            />

            <button type="submit">Register</button>

          </form>
        </div>
      </div>
    </div>
  )
}