import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate,  Link } from 'react-router-dom'

import "../css/main.css";
import "../css/addAppointment.css";

const MakeAppointment =()=>{
const[appointment, setAppointment] =useState([]);
const location = useLocation();
const navigate = useNavigate();
  const { profileId, scheduleId, appointmentDate,selectedTime, service, departmentId } = location.state
  const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
// console.log("Profile id: "+profileId);
//  console.log("Schedule id: "+scheduleId);
// console.log("Selected date: "+selectedTime);
// console.log("Appointment date: "+appointmentDate);
// console.log("Services: "+service);
// console.log("DEpartment id: "+departmentId);
const canSubmit =  customerName && customerEmail;
const registerAppointment = async (event) => {
    event.preventDefault();
    if(!canSubmit )
    {
      return;
    }else{
    const appointmentData = {
    profileId:profileId,
    scheduleId:scheduleId,
    customerName:customerName,
    customerEmail:customerEmail,
    appointmentDate:appointmentDate,
    appointmentTime:selectedTime, 
    services:service
    };

    const config = {
      method: 'post',
      data: appointmentData,
      url: 'http://localhost:80/BeautySalon/backend/controllers/AddAppointment.php/',
    };
    axios(config)
      .then(async (response) => {
        console.log('response',response);
        
        if(response.data.status ==='Valid'){
            alert(response.data.message);
            
            setTimeout( ()=>{               
              navigate(`/`);
          }, 1000); 
          }
          else{
           console.log("Appointment data: "+appointmentData);
            alert("Something went wrong");
            setTimeout( ()=>{               
              navigate(`/appointment/${profileId}/${departmentId}`);
          }, 1000); 
            
          }
              
        
      })
      .then((appointment) => {
        setAppointment(appointment);
        console.log("Appointment: "+appointment);
        
      })
      .catch((error) => {
        console.log(`error`, error.response);
      });
    }
  };


    return  <main>
        <div className="addAppointment-container">
        {appointment &&
            <form id="addAppointmentForm" onSubmit={registerAppointment}>
                <div className='addAppointment-form-group '>
                   <span className='addAppointment-span'>Profile id
                    <span className='text-danger'> *</span></span>
                    <input className='addAppointment-input' 
                    name='profileId' value={profileId || ''}
                    readOnly/>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Schredule id
                    <span className='text-danger'> *</span></span>
                    <input className='addAppointment-input' 
                    name='scheduleId' value={scheduleId || ''}
                    readOnly/>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Date
                    <span className='text-danger'> *</span></span>
                    <input className='addAppointment-input' 
                    name='appointmentDate' value={appointmentDate || ''}
                    readOnly/>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Selected time
                    <span className='text-danger'> *</span></span>
                    <input className='addAppointment-input' 
                    name='appointmentTime' value={selectedTime || ''}
                    readOnly/>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Services
                    <span className='text-danger'> *</span></span>
                    <input className='addAppointment-input' 
                    name='services' value={service || ''}
                    readOnly/>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Customer name
                    <span className='text-danger'> *</span></span>
                        <input type="text" 
                            name="customerName" 
                            className='addAppointment-input' 
                            placeholder="Enter your full name, please" required
                            onChange={e => setCustomerName(e.target.value)}></input>
                </div>
                <div className='addAppointment-form-group '>
                    <span className='addAppointment-span'>Customer name
                    <span className='text-danger'> *</span></span>
                        <input type="email" 
                            name="customerEmail" 
                            className='addAppointment-input'
                            placeholder="Enter your email, please" required
                            onChange={e => setCustomerEmail(e.target.value)}></input>
                </div> 
                <div className="addAppointment-form-group ">
                <Link to={`/appointment/${profileId}/${departmentId}`} className='link-profile-makeAppointment'>Go back Appointment</Link>
                      <button type="submit" name="submit"
                       className="addAppointment-btn"
                        >Save appointment</button>
                  </div>
            </form>}
        </div>
    </main>
}
export default MakeAppointment;