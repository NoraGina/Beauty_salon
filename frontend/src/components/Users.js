import axios from "axios"
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import React from 'react';

import "../css/main.css";
import "../css/users.css";
import Footer from "./Footer";


const Users = ()=>{
   
    const [users, setUsers] = useState([]);
   
    useEffect(() => {
        getUsers();
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getUsers = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalonTest/react-api/PHP/controllers/GetAllUsers.php/`)
            .then(res => {
              console.log(res.data.userList)
              setUsers(res.data.userList);
             
            })
          } catch (error) { throw error;}    
    }
    
    
    const deleteUser=(id)=>{ 
        axios.post(`http://localhost:80/BeautySalon/backend/controllers/DeleteUser.php/${id}`)
        .then(result=>{
          if(result.data.status ==='Valid'){
            
              alert(result.data.message);
             getUsers();
             }else{
            console.log(result.data.message);   
            alert(result.data.message);
          }
     }).catch(err=>console.log(err))}

     const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
          deleteUser(id);
        }
      };
    return (
        <><div className="users-container">
            <div className="users-table-caption">
                <h3 className="users-table-title"> Users list</h3>
                <Link to={`/addUser`} className="add-user-btn">New user</Link>
            </div>
            <div className="users-table-container responsive-users-table">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Id</th>
                            <th scope='col'>Full Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>User Name</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                            <th scope='col'>Profile</th>
                            <th scope='col'>Portofolio</th>
                            <th scope='col'>Schedules</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((user, key) => <tr key={key}>
                            <td data-label='#'>{key + 1}</td>
                            <td data-label='id'>{user.id}</td>
                            <td data-label='Full Name'>{user.fullName}</td>
                            <td data-label='Email'>{user.email}</td>
                            <td data-label='Use Name'>{user.userName}</td>
                            <td data-label='Role'>{user.role}</td>
                            <td data-label='Edit'>
                                <Link to={`/editUser/${user.id}`}><i className="bi bi-pen-fill edit-icon"></i></Link>
                            </td>
                            <td data-label='Delete'>

                                <button  onClick={() => deleteConfirm(user.id)} className="delete-btn"><i className="bi bi-person-x-fill delete-icon"></i></button>
                            </td>
                            <td data-label="Profile">
                            {
                (() => {
                    if(user.role === "STAFF") {
                        if(user.profileId){
                            return (
                               
                                <Link to={`/editProfile/${user.id}`} className="update-profile-link link-item"><i className="bi bi-pen-fill edit-icon"></i>Profile</Link>
                                
                            )
                        } else  {
                            return (
                                
                                <Link to={`/profile/add/${user.id}`} className="add-profile-link link-item"><i className="bi bi-file-plus-fill users-table-icon"></i>Profile</Link>
                                
                            )
                        }
                            
                        } else {
                            return (
                               ""
                            )
                        }
                })()  
            }  
                           
                            </td>
                            <td data-label='Portofolio'>
                                {user.role === "STAFF" ?
                                 <Link to={`/staffPortofolios/${user.id}`} className="portofolios-link link-item"><i className="bi bi-binoculars-fill users-table-icon"></i>Portofolio</Link>
                                 :
                                 ""
                                }
                           
                            </td>
                            <td data-label='Schedules'>
                                {user.role === "STAFF" ?
                                 <Link to={`/schedules/${user.id}`} className="schedules-link link-item"><i className="bi bi-binoculars-fill users-table-icon"></i>Schedules</Link>:
                                 
                                 ""
                                }
                           
                            </td>
                            
                        </tr>
                )}

                    </tbody>
                </table>
                
            </div>
            
        </div>
        <Footer></Footer></>
    )
}
export default Users;
/*<Link to={`/schedules/${user.id}`} className="schedules-link link-item"><i className="bi bi-binoculars-fill users-table-icon"></i>Schedules</Link>
{modalOpen && <Modal setOpenModal={setModalOpen} id={id} />}
*/