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
                <img src={user.avatarUrl == null ? AvatarImg : user.avatarUrl} alt="User"/>
            </div>
            <Link to='/dashboard'>
                <FiHome size={25} color="#fff"/>
                Request
            </Link>
            <Link to='/customers'>
                <FiUser size={25} color="#fff"/>
                Clients
            </Link>
            <Link to='/profile'>
                <FiSettings size={25} color="#fff"/>
                Profile
            </Link>
        </header>
    )
}
