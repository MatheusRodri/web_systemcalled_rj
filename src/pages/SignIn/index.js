import './signin.css'
import logo from '../../assets/logo.png'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return(
        <div className="container-center">
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='logo of system'/>
                </div>

                <form>
                    <h1>SignIn</h1>
                    <input type="text" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'>Access</button>
                </form>

                <Link to='/register'>Create a new account</Link>

            </div>
        </div>
    );  
}