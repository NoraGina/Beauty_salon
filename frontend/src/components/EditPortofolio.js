import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from 'react';

import "../css/main.css";
import "../css/updatePortofolio.css";

const EditPortofolio =(props)=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [portofolio, setPortofolio]= useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage]= useState('');
    const [title, setTitle] = useState('');

   
    useEffect(() => {
        getPortofolio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPortofolio = async () => {
        try {
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetOnePortofolio.php/${id}`)
            .then(res => {
              console.log(res.data.portofolio);
              setPortofolio(res.data.portofolio);
              setUserId(res.data.portofolio.userId)
              let getTitle=res.data.portofolio.title;
              let substr =getTitle.substring(0, getTitle.indexOf('-'))
              setTitle(substr)
            })
          } catch (error) { throw error;}    
    }
    let[fileName, setFileName]=useState("No selected file");
    const[file, setFile] = useState('');
    const handleInput =(e)=>{
        setPortofolio({...portofolio, [e.target.name]:e.target.value});
        console.log(e.target.value);
    }
    const handleFile=(e)=>{
        let imgValue =e.target.value;
        let eValue = imgValue.split("\\");
        fileName = eValue.pop();
        setFileName(fileName);
        setFile(e.target.files[0]);
        console.log(fileName);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            id: portofolio.id,
           title,
            description:portofolio.description,
            userName:portofolio.userName,
            profileId:portofolio.profileId,
            userId:portofolio.userId,
            file ,
            oldImage:portofolio.image
          }
          axios.post(`http://localhost:80/BeautySalon/backend/controllers/EditPortofolio.php/${id}`, formData,{
            headers:{
              'content-type': 'multipart/form-data'
            }
          }).then(function(res){
            if(res.data.status==="Valid")
            {
             setMessage(res.data.message);
             if(props.isAdmin){
              setTimeout( ()=>{               
                navigate(`/staffPortofolios/${userId}`);
            }, 2000);
             }else{
              setTimeout( ()=>{               
                navigate(`/staffPortofolios/${userId}`);
            }, 2000);
             }
             
            
            }
        });
    
    }

    const confirmUpdate = (e) => {
      if (window.confirm("Are you sure?")) {
        handleSubmit(e);
      }
    };

   
    return (
        
        <div className="updatePortofolio-container">
             <p className="text-sucess"> { message }</p>
            <form id="updatePortofolioForm" encType="multipart/form-data" onSubmit={confirmUpdate}>
                <div className='updatePortofolio-form-group'>
                    <h3 className='updatePortofolio-title'> Update Portofolio {portofolio.userName}
                    <input type="hidden" readOnly name="userName" value={portofolio.userName}/>
                    <input type="hidden"  name="profileId" value={portofolio.profileId} />
                    <input type="hidden" readOnly name="userId" value={portofolio.profileUserId}/>
                    </h3>
                </div>
                <div className='updatePortofolio-form-group'>
                    <span className='updatePortofolio-span'>Title
                    <span className='text-danger'> *</span></span>
                    <input className='updatePortofolio-input' 
                    name='title'
                    value={title}
                    onChange={handleInput} />
                </div>
                <div className='updatePortofolio-form-group'>
                <span className='updatePortofolio-span'>Description
                    <span className='text-danger'> *</span></span>
                    <textarea  id="" cols="35" rows="6" className='editPortofolio-textarea' 
                 name='description'  placeholder="Few words about your picture..." required
                 onChange={handleInput}
                 value={portofolio.description}>
                    </textarea>
                   
                </div>
                <div className='updatePortofolio-form-group clearfix'>
                    <span className='updatePortofolio-span'>Old image</span>
                    <figure>
                        <img src={"http://localhost:80/BeautySalon/backend/uploads/"+portofolio.image} alt={portofolio.title}/>
                        <figcaption>{portofolio.image}</figcaption>
                        <input value={portofolio.image} name="oldImage" type="hidden"></input>
                        </figure>
                </div>
                <div className='updatePortofolio-form-group '>
                    <span  className="updatePortofolio-span" id="fileId">Portofolio image <span className="text-danger"> *</span>
                    </span>    
                    
                    <input type="file" id="updatePortofolioFile" 
                    className="input-file" accept='image/*' onChange={handleFile} />
                    <label htmlFor="updatePortofolioFile"><strong><i className="bi bi-upload"></i> Choose a file</strong></label>
                    <br/>
                    <span id="imageName" className="img-span">{fileName}</span>
                </div>
                <div className="updatePortofolio-form-group">
                    <span className='updatePortofolio-span'></span>
                    <input name="id" value={portofolio.id}/>
                    <button type="submit" name="submit"
                    className="updatePortofolio-btn">Update portofolio</button>
                </div>
            </form>
        </div>
    )
}
export default EditPortofolio;
/*
<div className="updatePortofolio-container">
           
            <form id="updatePortofolioForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className='updatePortofolio-form-group'>
                    <h3 className='updatePortofolio-title'> Update Portofolio</h3>
                </div>
                <div className='updatePortofolio-form-group'>
                    <span className='updatePortofolio-span'>Title
                    <span className='text-danger'> *</span></span>
                    <input className='updatePortofolio-input' 
                    name='title'
                    value={portofolio.title}
                    onChange={handleInput} />
                </div>
                <div className='updatePortofolio-form-group'>
                    <span className='updatePortofolio-span'>Description
                    <span className='text-danger'> *</span></span>
                    <input className='updatePortofolio-input' 
                    name='description'
                    value={portofolio.description}
                    onChange={handleInput} />
                </div>
            <div className='updatePortofolio-form-group clearfix'>
                <span className='updatePortofolio-span'>Old image</span>
                    <figure>
                        <img  src={"http://localhost:8080/SalonTest/phpApi/uploads/"+portofolio.image} alt={portofolio.image}/ >
                        <figcaption name='oldImage'>{portofolio.image}</figcaption>
                      </figure>
                
            </div>
            <div className='updatePortofolio-form-group '>
                <span  className="updatePortofolio-span" id="fileId">Portofolio image <span className="text-danger"> *</span>
                </span>    
                
                <input type="file" id="addPortofolioFile" 
                className="input-file" accept='image/*' onChange={handleFile} />
                <label htmlFor="updatePortofolioFile"><strong><i className="bi bi-upload"></i> Choose a file</strong></label>
                <br/>
                <span id="imageName" className="img-span">{fileName}</span>
            </div>
            <div className="updatePortofolio-form-group">
                <span className='updatePortofolio-span'></span>
                <button type="submit" name="submit"
                 className="updatePortofolio-btn"
                  >Update portofolio</button>
            </div>
            </form>
        </div>
*/