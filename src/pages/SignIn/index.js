import './signin.css'
import logo from '../../assets/logo.png'
import {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn} = useContext(AuthContext);

    function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            signIn(email,password);
        }else{
            alert('Preencha todos os campos!');
        }
    }
    
    return(
        <div className="container-center">
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='logo of system'/>
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>SignIn</h1>
                    <input type="text" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button  type='submit'>Access</button>
                </form>

                <Link to='/register'>Create a new account</Link>

            </div>
        </div>
    );  
}