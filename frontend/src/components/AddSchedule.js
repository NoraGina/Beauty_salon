import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, useNavigate } from "react-router-dom";

import "../css/main.css";
import "../css/addSchedule.css";

const AddSchedule =()=>{
  const navigate = useNavigate();
    const {id} = useParams();
    
    const [isUser, setUser]= useState([]);
    const [userName, setUserName] =useState('');
    const [userId, setUserId] =useState('');
    const [profileId, setProfileId] = useState('');
     
    const getUser = async ()=> {
        try {
            axios.post(`http://localhost:80/BeautySalon/backend/controllers/GetOneProfile.php/${id}`)
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
           
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUser.userId, isUser.userName, isUser.id]); 

    const[selectedDate, setSelectedDate] =useState('');
    
    const[shift, setShift]= useState('');
    const[schedule, setSchedule]=useState([]);
    const[status, setStatus]=useState('');
   

    const canSubmit = selectedDate && shift && status;
    function refreshPage() {
      window.location.reload(false);
    }
    const handleSubmit =async(event) => {
      event.preventDefault();
      if(!canSubmit ){
          return;
         
          }else{
              const formData = {
                  userId,
                  profileId,
                  selectedDate,
                  shift,
                  userName,
                   status
                  }
                  
                await  axios.post(`http://localhost:80/BeautySalon/backend/controllers/AddSchedule.php/${id}`, formData)
          .then((result)=>{
            
              if(result.data.status ==='Valid' && result.data.option === "weekly"){
                alert(result.data.message);
                
                setTimeout( ()=>{               
                  navigate(`/schedules/${userId}`);
              }, 1000); 
              }else if(result.data.status ==='Valid' && result.data.option === "daily"){
                alert(result.data.message);
                setTimeout( ()=>{               
                  refreshPage();
              }, 1000);
              }
              else{
                alert("Schedule alreay added");
                setTimeout( ()=>{               
                  navigate(`/schedules/${userId}`);
              }, 1000); 
                
              }
                  
              
          })
          .then((schedule) => {
            setSchedule(schedule);
            
          })
          .catch(err => console.log(err)) 
         }
                    
  }  

    return(
        <main>
            <div className="addSchedule-container">
                {schedule&&
                  <form id="addScheduleForm" onSubmit={handleSubmit}>
                  <div className='addSchedule-form-group'>
                      <h3 className='addSchedule-title'> Add schedule {userName}</h3>
                     
                  </div>
                  <div className='addSchedule-form-group'>
                      <span className='addSchedule-span'>User Id
                      <span className='text-danger'> *</span></span>
                      <input className='addSchedule-input' 
                       name='userId' value={userId || ''}
                       readOnly/>
                        <input className='addSchedule-input' 
                       name='userName' value={userName|| ''}
                       readOnly type='hidden' />
                  </div>
                  <div className='addSchedule-form-group'>
                      <span className='addSchedule-span'>Profile Id
                      <span className='text-danger'> *</span></span>
                      <input className='addSchedule-input' 
                       name='profileId' value={profileId ||''}
                       readOnly/>
                  </div>
                  <div className='addSchedule-form-group'>
                      <span className='addSchedule-span'>Shift
                      <span className='text-danger'> *</span></span>
                      <select name="shift" id="addScheduleSelect" 
                      onChange={e => setShift(e.target.value)}>
                        <option value="">Choose a shift please</option>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                      </select>
                  </div>
                  <div className='addSchedule-form-group'>
                      <span className='addSchedule-span'>Date
                      <span className='text-danger'> *</span></span>
                      <input type="date" className='addSchedule-input' 
                       name='selectedDate' required
                       onChange={e => setSelectedDate(e.target.value)}/>
                  </div>

                  <div className='addSchedule-form-group'>
                      <span className='addSchedule-span'>Daily/Weekly
                      <span className='text-danger'> *</span></span>
                      <select name="status" id="addScheduleSelectStatus" 
                      required
                      onChange={e => setStatus(e.target.value)}>
                        <option value="">How to add the schedule?</option>
                          <option value="daily" >Daily</option>
                          <option value="weekly">Weekly</option>
                      </select>
                  </div>
                  <div className="addShedule-form-group">
                      <span className='addSchedule-span'></span>
                      <button type="submit" name="submit"
                       className="addSchedule-btn"
                        >Add schedule</button>
                  </div>
              </form>
                }

            </div>
        </main>
    )


}
export default AddSchedule;
/*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:3000"
              }
             setTimeout( ()=>{               
                  refreshPage();
              }, 1000); 
              */