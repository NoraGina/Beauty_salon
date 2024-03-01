import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, useNavigate } from "react-router-dom";

import "../css/main.css";
import "../css/addProfile.css";

const AddProfile = (props)=>{
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const {id} = useParams();
    const [userName, setUserName] =useState('');
    const [userId, setUserId] =useState(''); 
    const [department, setDepartment] = useState([]);
    const [isUser, setUser]= useState({});
   
    useEffect(() => {
      if(props.isAdmin){
        getUser();
        setUserId(isUser.id);
        setUserName(isUser.userName);
      }else{
        setUserId(user.id);
        setUserName(user.userName);
      }
       
    }, [isUser.id, isUser.userName, user.id, user.userName]);
    const getUser = async ()=> {
        try {
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetOneUser.php/${id}`)
            .then(res => {
              console.log(res.data.userList)
              setUser(res.data.userList);
            
             
            })
          } catch (error) { throw error;}   
    }
    
    useEffect(() => {
      allDepartments();
  }, []); 
  
      const allDepartments = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAllDepartments.php`)
            .then(res => {
              console.log(res.data.departmentList)
              setDepartment(res.data.departmentList);
             
            })
          } catch (error) { throw error;}    
    }
      let[phone, setPhone] =useState('');
      let[departmentId, setDepartmentId]=useState([]);
      let[about, setAbout]=useState('');
      let[fileName, setFileName]=useState("No selected file");
      const[file, setFile] = useState('');
      const[profile, setProfile] =useState([]);
      const canSubmit = phone  && about && departmentId ;

  
    const handleFile=(e)=>{
      let imgValue =e.target.value;
       let eValue = imgValue.split("\\");
       fileName = eValue.pop();
      setFileName(fileName);
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      console.log(fileName);
  }
    const  onSelect = e => {
        setDepartmentId(e.target.value[0]);
        console.log(e.target.value[0]);
      }
      
      const submit = async(event) => {
        event.preventDefault();
        if(!canSubmit && !file){
            return;
           
            }else{
                const formData = {
                    userName,
                    userId,
                    phone,
                    departmentId,
                    about,
                    file,
                    }
                    await axios.post('http://localhost:80/BeautySalon/backend/controllers/AddProfile.php/', formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((result)=>{
              
                if(result.data.status ==='Valid'){
                  if(props.isAdmin){
                    alert(result.data.message);
                    setTimeout( ()=>{               
                      navigate('/users');
                  }, 1000);
                   }else{
                    alert(result.data.message);
                    setTimeout( ()=>{               
                      navigate('/');
                  }, 1000);
                   }
                  
                    
                }else{
                  console.log(result.data.message);   
                  alert(result.data.message);
                }
            })
            .then((profile) => {
              setProfile(profile);
              console.log(profile);
            })
            .catch(err => console.log(err)) 
           }
                      
    }  

    return<div className='addProfile-container'>
          {profile&&<>
    <form id="addProfileForm" encType="multipart/form-data" onSubmit={submit} >
          <div className='addProfile-form-group'>
              <h3 className='addProfile-title'> Add Profile</h3>
          </div>
         
        <div className='addProfile-form-group'>
            <span className='addProfile-span'>Username
            <span className='text-danger'> *</span></span>
            
            <input className='addProfile-input' 
             name='userName' value={userName}
             readOnly/>
            <br></br>
            <input className='addProfile-input' 
            name='userId' value={userId} 
             readOnly  />
        </div>
          
          
          <div className='addProfile-form-group'>
              <span className='addProfile-span'>Telephone
              <span className='text-danger'> *</span></span>
              <input className='addProfile-input' 
              name='phone' placeholder='Your phone...' required
              onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className='addProfile-form-group'>
              <span  className="addProfile-span" id="fileId">Profile image <span className="text-danger"> *</span>
              </span>    
              
              <input type="file" id="addProfileFile" name='file'
              className="input-file" accept='image/*' onChange={handleFile} />
              <label htmlFor="addProfileFile"><strong><i className="bi bi-upload"></i> Choose a file</strong></label>
              <br/>
              <span id="imageName" className="img-span">{fileName}</span>
              
          </div>
          <div className="addProfile-form-group about-you">
              <span className="addProfile-span">About you <span className="text-danger"> *</span></span>
              <textarea name="about" id="" cols="35" rows="6"
               className="addProfile-textarea" 
               placeholder="Few words about you..." required
               onChange={e => setAbout(e.target.value)}></textarea>
          </div>
          <div className="addProfile-form-group">
                    <span className="addProfile-span">Department <span className="text-danger"> *</span></span>
                    <select name="departmentId" id="jobTitleOptions" 
                    className="addProfile-select"
                    onChange={onSelect}>
                      <option value="">Select a department</option>
                        {department.map((item, index)=>
                         <><option key={item.id} value={item.id}>{item.name}</option>
                         </>
                        )}
                       
                    </select>
            </div>
          <div className="addProfile-form-group">
              <span className='addProfile-span'></span>
              <button type="submit" name="submit"
               className="addProfile-btn"
                >Add profile</button>
          </div>
          </form>
         </> }
    </div>
}
export default AddProfile;