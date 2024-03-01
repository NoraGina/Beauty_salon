import React from "react";
import { useState , useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';

import "../css/main.css";
import "../css/editProfile.css";

const EditProfile = (props)=>{
    const navigate= useNavigate();  
    
    const {id} = useParams();
    const [isProfile, setProfile]= useState([]);
    const [department, setDepartment] = useState([]);
    let[fileName, setFileName]=useState("No selected file");
    const[file, setFile] = useState('');
    
    const handleInput =(e)=>{
        setProfile({...isProfile, [e.target.name]:e.target.value});
        //console.log(e.target.value);
    }
    const handleFile=(e)=>{
        let imgValue =e.target.value;
        let eValue = imgValue.split("\\");
        fileName = eValue.pop();
        setFileName(fileName);
        setFile(e.target.files[0]);
        //console.log(fileName);
    }
    const profile =async () => {
        try {
        await  axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetOneProfile.php/${id}`)
            .then((result)=>{
                          
                if(result.data.status ==='Invalid' ){
                    
                    console.log(result.data.message);
                  
                }else{
                  
                    const findProfile = result.data.profileList;
                    console.log("Edit profile: "+findProfile);
                   setProfile(findProfile);
                
                }
            })
          } catch (error) { throw error;}    
        }
    useEffect( () => {
    
      window.scrollTo(0, 0);
      profile();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    useEffect(() => {
      allDepartments();
    }, []); 
      
      const allDepartments = async () => {
            try {
                axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAllDepartments.php`)
                .then(res => {
                 // console.log(res.data.departmentList)
                  setDepartment(res.data.departmentList);
                 
                })
              } catch (error) { throw error;}    
        }
      const handleSubmit =async(e)=>{
        e.preventDefault();
        //console.log(isProfile);
        const formData = {
          userId: isProfile.userId,
          id: isProfile.id,
          userName:isProfile.userName,
          fullName:isProfile.fullName,
          departmentId:isProfile.departmentId,
          about:isProfile.about,
          phone:isProfile.phone,
          file ,
          oldImage:isProfile.image
        }
        
        axios.post(`http://localhost:80/BeautySalon/backend/controllers/EditProfile.php`, formData,{
          headers:{
            'content-type': 'multipart/form-data'
          }
        }).then(function(res){
          if(res.data.status="Valid")
          {
           
           if(props.isAdmin){
            alert(res.data.message);
            setTimeout( ()=>{               
              navigate('/users');
          }, 2000);
           }else{
            alert(res.data.message);
            setTimeout( ()=>{               
              navigate('/');
          }, 2000);
           }
           
          
          }
      });
        
       } 

      const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
          deleteProfile(id);
        }
      };

       const confirmUpdate = (e) => {
        if (window.confirm("Are you sure?")) {
          handleSubmit(e);
        }
      };
       
      const deleteProfile=(id)=>{ 
        axios.post(`http://localhost:80/BeautySalon/backend/controllers/DeleteProfile.php/${id}`)
        .then(result=>{
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
     }).catch(err=>console.log(err))}
    


       return <div className="profile-container">
       
       {isProfile ?
            <div className="profile-card">
       <form encType="multipart/form-data" onSubmit={confirmUpdate}>
  
   <div className="profile-group">
                <div className="img-container">
                    <img src={"http://localhost:80/BeautySalon/backend/uploads/"+isProfile.image} className="profile-img" alt="" />
                </div>
            </div>
        <div className="profile-group">
            <h3 className="profile-title">{isProfile.fullName}</h3>
            <input className="profile-input"  type="hidden" name='userId'
            defaultValue={isProfile.userId || ""}></input>
             <input className="profile-input" name='id'
            defaultValue={isProfile.id || ""}  type="hidden"
           ></input>
               
             <input  type="hidden" name='userName'
            defaultValue={isProfile.userName || ""}></input>
        </div>
        <div className='profile-group'>
        <span  className="profile-span">Image name </span> 
                <input  type="text" name='oldImage' className="readonly-input"
            defaultValue={isProfile.image} readOnly></input>
        </div>
        <div className='profile-group'>
        
        <span  className="profile-span" id="fileId">Profile image 
             </span> 
             
             <input type="file" id="profileFile" name='file'
             className="profile-input-file" accept='image/*' 
             
             onChange={handleFile} />
             <label htmlFor="profileFile"><i className="bi bi-upload"></i> Choose a file</label>
             <br/>
             <span  className="profile-span"> </span> 
             <span  className="img-span" value={fileName} >{fileName}</span>
         </div>
        <div className="profile-group">
            <span className="profile-span">Telephone </span>
            <input type="text" name="phone" className="profile-input"  
             value={isProfile.phone}
             onChange={handleInput}/>
        </div>
        <div className="profile-group">
            <span className="profile-span">Email</span> 
            <input type="email" name="email" readOnly className="profile-input"  
            value={isProfile.email}
            onChange={handleInput}/>
        
        </div>
        <div className="profile-group about-you">
            <span className="profile-span">About you</span>
            <textarea name="about" id="" cols="30" rows="5" 
            className="profile-textarea" 
           value={isProfile.about}
            onChange={handleInput}></textarea>
        </div>
        <div className="profile-group">
                   <span className="profile-span">Job title </span>
                   <select name="departmentId" id="jobTitleOptions" 
                   className="profile-select"
                   onChange={handleInput}
                   value={isProfile.departmentId}>
                           {department.map((item, index)=>
                            <><option key={index} value={item.id}>{item.name}</option>
                            </>
                           )}
                   </select>
           </div>
        
        
        <div className="profile-group button-container">
            
            <button  className="profile-link update-link"><i className="bi bi-pen-fill edit-icon"></i>Profile</button>
           
        </div>

   
   </form>
   <div className="profile-group button-container">
<button  className="profile-link delete-link" onClick={() => deleteConfirm(isProfile.userId)}> <i className="bi bi-trash-fill delete-icon" ></i>Delete</button>
</div>
   </div>:
   <div className="profile-card message-card" id="emptyMessage">
      
   <h3 className="empty-msg"> you do not have a profile</h3>
   
   </div>
   }
   </div>
   
}
export default EditProfile;