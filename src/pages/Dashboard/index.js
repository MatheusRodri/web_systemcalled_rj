import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Dashboard(){
    
    const{logout} = useContext(AuthContext);

     async function handleLogout(){
        await logout();
    }
    
    return(
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}