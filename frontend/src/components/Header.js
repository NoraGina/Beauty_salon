import React, {useState, useEffect}from 'react';

import axios from 'axios';
import { Link } from "react-router-dom";

 import staffLogo  from '../img/salon_logo.png';
 import "../css/main.css";
 import "../css/header.css";

const Header = (props)=>{
    const [department, setDepartment] = useState([]);
    const [isActive, setActive] = useState(true);
    const [profileId, setProfileId] = useState(0);
    
   
    const toggleMenu = () => {
        setActive(!isActive);
      };
    
    const logout = props.logout;

      
    const getUserId = ()=>{
        
        if(props.loggedUser){
          const items = JSON.parse(localStorage.getItem('user') || "[]");
          if(items ){
            return items.id;
          }else{
            return false;
          }
         
        }else{
            return false;
        }
      }
      const userId = parseInt(getUserId());
    // console.log(typeof(userId));
    //   const user = JSON.parse(localStorage.getItem("user") || "[]");
    //   const userId = user[0].id;
     
    //to={`viewStaffProfile/${userId}`}
    useEffect(() => {
        allDepartments();
    }, []); 
    const allDepartments = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAllDepartments.php`)
            .then(res => {
              //console.log(res.data.departmentList)
              setDepartment(res.data.departmentList);
             
            })
          } catch (error) { throw error;}    
    }
    const getProfile =async () => {
        try {
        await  axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetProfileId.php/${userId}`)
            .then((result)=>{
                            
                if(result.data.status ==='Invalid' ){
                    
                   // console.log(result.data.message);
                  
                }else{
                  
                    let findProfile = result.data.profile;
                   // console.log("Profile result data: "+result.data.profile);
                   
                   setProfileId(findProfile);
                  // setProfile(findProfile);
                   
                }
            })
          } catch (error) { throw error;}    
        }
    useEffect( () => {
    
    //   window.scrollTo(0, 0);
      getProfile();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]); 

  
    return(
        <div className='navbar'>
                 <div className='logo-box'>
                    <Link  to="/" >
                        <img src={staffLogo} className="logo-img" alt="Logo missing..." />
                    </Link>
                 </div>
                
                     <div  className={`navbar-nav ${!isActive ? "inactive" : ""}`} id="navMenu"> 
                     <div className='left-part ' id="navlistLeft">
                        <div className='nav-item'>
                            <Link to="/" className='nav-link'>
                                <i className="bi bi-house-door-fill nav-icon"> Home</i>
                            </Link>
                        </div>
                        <div className='nav-item'>
                            <Link to="/viewPriceList" className='nav-link'>
                            <i className="bi bi-list-ul">Price list </i>
                            </Link>
                        </div>
                      
                      {!!props.isAdmin&&<>
                        <div className="nav-item">
                            <Link to="/departments" className="nav-link">
                            <i className="bi bi-list-ol"> Departments</i>
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/addDepartment" className="nav-link">
                            <i className="bi bi-file-earmark-plus">Add department</i>
                            </Link>
                        </div>
                      <div className="nav-item">
                            <Link to="/users" className="nav-link">
                            <i className="bi bi-person-vcard-fill"> Users</i>
                            </Link>
                        </div>
                        <div className='nav-item'>
                            <Link to="/addUser" className='nav-link'>
                                <i className="bi bi-person-plus-fill"> Add user</i>
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/profiles" className="nav-link">
                            <i className="bi bi-card-list"> Profiles</i>
                            </Link>
                        </div>
                        <div className="sub-menu">
                        <button className="btn"><i className="bi bi-list-ul"></i>Price list<i className="bi bi-caret-down-fill"></i></button>
                        <div className='content'>
                        {department.map((item, index)=>
                       <div className='submenu-item'>
                             <Link key={index} to={`/adminPriceList/${item.id}`} className="nav-link">{item.name}</Link> 
                       </div>
                         
                        )}

                        </div>
                        </div>
                        
                      </>}
                        
                        {!!props.isStaff&&<>
                        <div className='nav-item'>
                                <Link to={`profile/add`} className='nav-link'>
                                    <i className="bi bi-people-fill">Add Profile</i>
                                </Link>
                        </div>
                        <div className='nav-item'>
                                <Link to={`/editProfile/${userId}`} className='nav-link'>
                                <i className="bi bi-person-vcard-fill">Edit Profile</i>
                                </Link>
                        </div>
                        
                       
                        <div className="nav-item">
                            <Link to={`/staffPortofolios/${userId}`} className="nav-link">
                                <i className="bi bi-images">Portofolios</i>
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to={`/schedules/${userId}`} className="nav-link">
                            <i className="bi bi-calendar3">Schedules</i>
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to={`/appointments/${profileId}`} className="nav-link">
                            <i className="bi bi-table">Appointments</i>
                            </Link>
                        </div>
                        
                        </>}
                    </div>
                    
                    <div className="right-part" id="navlistRight">
                     
                       {!props.loggedUser&& <>
                        <div className='nav-item'>
                            <Link to="/signup" className='nav-link'>
                                <i className="bi bi-person-plus-fill"> Signup</i>
                            </Link>
                        </div>
                       
                        
                        <div className='nav-item'>
                            <Link to="/login" className='nav-link'>
                                <i className="bi bi-box-arrow-in-right" id="loginIcon"></i> Login
                            </Link>
                        </div>
                       
                        </>}
                       
                      {!!props.loggedUser&& <>
                            <div className='nav-item'>
                            <button className='logout-btn' onClick={logout}>
                            <i className="bi bi-box-arrow-right" id='logoutIcon'></i> Logout
                            </button>
                        </div>
                        </>}
                        
                           
                    
                      
                        
                    </div>
                     </div>
                  
                
            <div className="hamburger" id="toggleButton" onClick={toggleMenu}>
                <i className="bi bi-list"></i>
            </div>
        </div>
         
        );
}

export default Header;

/* <div className='nav-item'>
<Link to="/addProfile" className='nav-link'>
    <i className="bi bi-person-plus-fill"> Add profile</i>
</Link>
</div> */