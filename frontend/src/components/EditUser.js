import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from 'react';

import "../css/main.css";
import "../css/updateUser.css";

const EditUser =()=>{
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        fullName:'',
        userName:'',
        email:'',
        password:'',
        role:'',
        
        id:''
    });

    
    
    const {id} = useParams();
    useEffect(() => {
        getUser();
    }, []);
    const getUser = async ()=> {
        try {
           await axios.get(`http://localhost:80/BeautySalonTest/react-api/PHP/controllers/GetOneUser.php/${id}`)
            .then(res => {
              console.log(res.data.userList)
              setInputs(res.data.userList);
            
             
            })
          } catch (error) { throw error;}   
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = {
            fullName:inputs.fullName,
            userName:inputs.userName,
            email:inputs.email,
            password:inputs.password,
            role:inputs.role,
            
            id: inputs.id,
            
          }
        await axios.put(`http://localhost:80/BeautySalonTest/react-api/PHP/controllers/EditUser.php/${id}`, formData)
        .then(function(res){
            
             if(res.data.status==="Valid"){
                alert(res.data.message);
                setTimeout( ()=>{               
                    navigate('/users');
                }, 1000);
             }else{
                alert(res.data.message);
                setTimeout( ()=>{               
                    navigate('/users');
                }, 1000);
             }
             
        
        });

    }

    const confirmUpdate = (e) => {
        if (window.confirm("Are you sure?")) {
          handleSubmit(e);
        }
      };
       
   
    return (
        <div className="update-user-container">
            
            <form id="updateUserForm" onSubmit={confirmUpdate}>
                <div className="updateUser-form-group">
                    <h3 className="updateUser-title">Update user</h3>
                    <input type="text"
                        className="updateUser-input"
                        name="userId"
                        value={inputs.id} 
                        readOnly />
                </div>
                <div className="updateUser-form-group">
                    <span className="updateUser-span" >Fullname <span className="text-danger"> *</span></span >
                    <input type="text"
                        className="updateUser-input"
                        name="fullName"
                        value={inputs.fullName || ''} 
                        onChange={handleChange} />
                </div>
                <div className="updateUser-form-group">
                    <span className="updateUser-span" >Username <span className="text-danger"> *</span></span >
                    <input type="text"
                        className="updateUser-input"
                        name="userName"
                        value={inputs.userName || ''} 
                        onChange={handleChange} />
                </div>
                <div className="updateUser-form-group">
                    <span className="updateUser-span" >Email <span className="text-danger"> *</span></span >
                    <input type="email"
                        className="updateUser-input"
                        name="email"
                        value={inputs.email || ''} 
                        onChange={handleChange} />
                </div>
                <div className="updateUser-form-group">
                    <span className="updateUser-span" >Password<span className="text-danger"> *</span></span >
                    <input type="password"
                        className="updateUser-input"
                        name="password"
                        value={inputs.password || ''} 
                        onChange={handleChange} />
                </div>
                <div className="updateUser-form-group">
                    <span className="updateUser-span" >Role <span className="text-danger"> *</span></span>

                    <input type="checkbox" className="checkbox-input" name="role" id="checkbox1" value={inputs.role} />
                    <label htmlFor="checkbox1">STAFF
                    <span className="checkbox"  > </span>
                    </label>

                    <input type="checkbox" className="checkbox-input" name="role" id="checkbox2" value={inputs.role} />
                    <label htmlFor="checkbox2" >ADMIN
                    <span className="checkbox"> </span>
                    </label>
                </div>
                <div className="updateUser-form-group">
                    <button className="updateUser-btn">Edit</button>
                </div>
            </form>
        </div>
    )
}
export default EditUser;