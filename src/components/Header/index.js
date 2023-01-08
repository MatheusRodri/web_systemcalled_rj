import { useContext } from 'react';
import AvatarImg from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import {FiHome,FiUser,FiSettings} from 'react-icons/fi';
import './header.css'

export default function Header(){

    const { user } = useContext(AuthContext);

    return(
        <header className="sidebar">
            <div>
                <img src={user.avatarURL == null ? AvatarImg : user.avatarUrl} alt="User Picture"/>
            </div>
            <Link to='/dashboard'>
                <FiHome size={25} color="#fff"/>
                Request
            </Link>
            <Link to='/customers'>
                <FiUser size={25} color="#fff"/>
                Clients
            </Link>
            <Link to='/settings'>
                <FiSettings size={25} color="#fff"/>
                Settings
            </Link> 
        </header>
    )
}