import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

export default function Dashboard(){
    
    const{logout} = useContext(AuthContext);

     async function handleLogout(){
        await logout();
    }
    
    return(
        <div>
            <Header/>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}