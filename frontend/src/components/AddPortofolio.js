import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, useNavigate } from "react-router-dom";

import "../css/main.css";
import "../css/addPortofolio.css";

const AddPortofolio = (props)=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [isUser, setUser]= useState([]);
    const [userName, setUserName] =useState('');
    const [userId, setUserId] =useState('');
    const [jobTitle, setJobTitle]=useState('');
    const [profileId, setProfileId] = useState('');
    const [departmentId, setDepartmentId]=useState('');
    const getUser = async ()=> {
        try {
            await axios.post(`http://localhost:80/BeautySalon/backend/controllers/GetOneProfile.php/${id}`)
            .then(res => {
              console.log(res.data.profileListt)
              setUser(res.data.profileList);
             
            })
          } catch (error) { throw error;}   
    }
    useEffect(() => {
        getUser();
        
        setUserId(isUser.userId);
        setUserName(isUser.userName);
        setProfileId(isUser.id);
        setJobTitle(isUser.name);
        setDepartmentId(isUser.departmentId);
          
    }, [isUser.id,  isUser.userName, isUser.userId,isUser.name]); 

  
      let[title, setTitle] =useState('');
      let[description, setDescription]=useState('');
      let[fileName, setFileName]=useState("No selected file");
      const[file, setFile] = useState('');
      const[portofolio, setPortofolio] =useState([]);
      const canSubmit = title  && description ;

      const handleFile=(e)=>{
        let imgValue =e.target.value;
         let eValue = imgValue.split("\\");
         fileName = eValue.pop();
        setFileName(fileName);
        setFile(e.target.files[0]);
    }
   
    const submit = (event) => {
        event.preventDefault();
        if(!canSubmit && !file){
            return;
           
            }else{
                const formData = {
                    userName,
                    userId,
                    profileId,
                    title,
                    description,
                    jobTitle,
                    file,
                    departmentId,
                    }
            axios.post('http://localhost:80/BeautySalon/backend/controllers/AddPortofolio.php/', formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((result)=>{
              
                if(result.data.status ==='Valid'){
                  if(props.isAdmin){
                    alert(result.data.message);
                    setTimeout( ()=>{               
                      navigate(`/staffPortofolios/${id}`);
                  }, 1000);
                   }else{
                    alert(result.data.message);
                    setTimeout( ()=>{               
                      navigate(`/staffPortofolios/${id}`); 
                  }, 1000);
                   }
                  
                    
                }else{
                  console.log(result.data.message);   
                  alert(result.data.message);
                  setTimeout( ()=>{               
                    navigate('/');
                }, 1000);
                }
            })
            .then((portofolio) => {
              setPortofolio(portofolio);
              console.log(portofolio);
            })
            .catch(err => console.log(err)) 
           }
                      
    }  
    return<div className='portofolio-container'>
       
             {portofolio&&<>
                <form id="addPortofolioForm" encType="multipart/form-data" onSubmit={submit}>
            <div className='addPortofolio-form-group'>
                <h3 className='addPortofolio-title'> Add Portofolio</h3>
            </div>
            <div className='addPortofolio-form-group'>
                <span className='addPortofolio-span'>Username
                <span className='text-danger'> *</span></span>
                
                <input className='addPortofolio-input' 
                 name='userName' value={userName || ''}
                 readOnly/>
                  
            <input className='addProfile-input d-block' 
            name='userId' value={userId || ''} 
             readOnly type='hidden' />
              
            <input className='addProfile-input' 
            name='profile' value={profileId || ''} 
             readOnly type='hidden' />
                
            </div>
            <div className='addPortofolio-form-group'>
                <span className='addPortofolio-span'>Job title
                <span className='text-danger'> *</span></span>
                
                <input className='addPortofolio-input' 
                 name='jobTitle' value={jobTitle || ''}
                 readOnly/>
                 <input className='addPortofolio-input' 
                 name='departmentId' value={departmentId || ''}
                 readOnly type='hidden'/>
                
            </div>
            <div className='addPortofolio-form-group'>
                <span className='addPortofolio-span'>Title
                <span className='text-danger'> *</span></span>
                
                <input className='addPortofolio-input' 
                 name='portofolioTitle'
                 placeholder='Add a title...' required
                 onChange={e => setTitle(e.target.value)} />
                
            </div>
            <div className='addPortofolio-form-group'>
                <span  className="addPortofolio-span" id="fileId">Portofolio image <span className="text-danger"> *</span>
                </span>    
                
                <input type="file" id="addPortofolioFile" 
                className="input-file" accept='image/*' onChange={handleFile} name='file'/>
                <label htmlFor="addPortofolioFile"><strong><i className="bi bi-upload"></i> Choose a file</strong></label>
                <br/>
                <span id="imageName" className="img-span">{fileName}</span>
            </div>
            <div className='addPortofolio-form-group'>
                <span className='addPortofolio-span'>About
                <span className='text-danger'> *</span></span>
                
                <textarea  id="" cols="35" rows="6" className='addPortofolio-textarea' 
                 name='description'  placeholder="Few words about your picture..." required
                 onChange={e => setDescription(e.target.value)}>
                    </textarea>
                
            </div>
            <div className="addPortofolio-form-group">
                <span className='addPortofolio-span'></span>
                <button type="submit" name="submit"
                 className="addPortofolio-btn"
                  >Add Portofolio</button>
            </div>
        </form>
             </>}
        </div>
}
export default AddPortofolio;