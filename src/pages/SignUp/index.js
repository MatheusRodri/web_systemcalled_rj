import { useState,useContext } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';


export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp,loadingAuth} = useContext(AuthContext);

    async function handleSignUp(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){
           await signUp(name,email,password);
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

                <form onSubmit={handleSignUp}>
                    <h1>Create your account</h1>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'>
                        {loadingAuth ? 'Loading...' : 'Create account'}
                    </button>
                </form>

                <Link to='/register'>Already an account ? Sign In</Link>

            </div>
        </div>
    );  
}