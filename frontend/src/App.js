import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./components/Home";
import Login from './components/Login';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

const App =()=>{

  const useAuth = () => {
		const user = localStorage.getItem("user")
		if (user) {
      
			return true
		} else {
			return false
		}
	}
  let user = useAuth();

  const roleStaff = ()=>{
    
    if(user){
      const items = JSON.parse(localStorage.getItem('user') || "[]");
      if(items.role === 'STAFF') {
        return true;
      }else{
        return false;
      }
    }
  }
  const isStaff = roleStaff();
  let navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    user = false;
    navigate("/");
}
const roleAdmin = ()=>{
    
  if(user){
    const items = JSON.parse(localStorage.getItem('user'));
    
    
    if(items.role === 'ADMIN') {
      return true;
    }else{
      return false;
    }
  }
}
const isAdmin = roleAdmin();
return(
  <div className="container-fluid">
     <Header loggedUser={!!user}
             isStaff={!!isStaff}
             logout ={logout}
             isAdmin={!!isAdmin}
             />
      <Routes>
      <Route path="/" element={<Home isStaff={!!isStaff} isAdmin={!!isAdmin}/>}/>
      {!user&& <>
        <Route path="login" element={<Login/>}/>
      </>}
      {!!isAdmin&&<>
        <Route path="users" element={<Users isAdmin={!!isAdmin}/>}/>
        <Route path="addUser" element={<AddUser isAdmin={!!isAdmin}/>}/>
        <Route path="editUser/:id" element={<EditUser/>}/>
      </>}
      {!!isStaff&&<>
      </>}
      </Routes>
  </div>
)
}

export default App;