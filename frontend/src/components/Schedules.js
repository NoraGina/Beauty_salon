import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";

import React from 'react';

import "../css/main.css";
import "../css/schedules.css";
import Footer from "./Footer";
import AddSchedule from "./AddSchedule";


const Schedules = (props)=>{
    const {id} = useParams();
       const [schedules, setSchedules] = useState([{
        id:'',
        userId:'',
        profileId:'',
        shift:'',
        date:'',
        start:'',
        end:'',
        appointments:'',

}]);
const [editId, setEditId] = useState(-1);
const [shift, setShift] = useState('');
const [updatedDate, setUpdatedDate] = useState('');
    
    const [userName, setUserName]= useState('');
    
    
    useEffect(() => {
        getSchedules();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSchedules = async () => {
        try {
            axios.post(`http://localhost:80/BeautySalon/backend/controllers/StaffAndAdminSchedules.php/${id}`)
            .then(res => {
              if(res.data.status === "Valid"){
                setSchedules(res.data.schedules);
                let currentUser = res.data.schedules[0];
               setUserName(currentUser.userName);
              
              }else{
                console.log(res.data.message);
              } 
             
            })
          } catch (error) { throw error;}    
    }

const handleEdit =(id)=>{
    setEditId(id);
}

const handleUpdate =async ()=>{
    const formData = {
        userId: schedules.userId,
        id: editId,
        profileId:schedules.profileId,
        shift:shift,
        date:updatedDate,
      }
      try {
      await axios.post(`http://localhost:80/BeautySalon/backend/controllers/EditSchedule.php/${editId}`, formData)
      .then(function(res){
        alert(res.data.message);
        setEditId('');
        getSchedules();
      })

      }catch (error) { throw error;}
}

const deleteSchedule=(id)=>{ 
    axios.post(`http://localhost:80/BeautySalon/backend/controllers/DeleteSchedule.php/${id}`)
    .then(result=>{
      if(result.data.status ==='Valid'){
        
          alert(result.data.message);
         getSchedules();
         }else{
        console.log(result.data.message);   
        alert(result.data.message);
      }
 }).catch(err=>console.log(err))}

 const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteSchedule(id);
    }
  };

 return<>
    {schedules.length >0  ?
        <><div className="schedules-container">
            <div className="schedules-table-caption">
            <h3 className="schedules-table-title">{userName}{""} Schedules</h3>
            <Link to={`/addSchedule/${id}`} className="add-schedule-btn">New schedule</Link>
            
            </div>
            <div className="schedules-table-container">

                <table className="schedules-table responsive-schedules-table">
                <thead className="schedules-header">
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Id</th>
                        <th scope='col'>User id</th>
                        <th scope='col'>Profile id</th>
                        <th scope='col'>Shift</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Start</th>
                        <th scope='col'>End</th>
                        <th scope='col'>Appointments</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                          {props.isStaff ?
                                  <th scope ='col'>
                          View Appointments
                                  </th>
                                  :
                                  ""
                                  }
                        </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, key)=>
                  <>
                    {schedule.id === editId ?
                    <tr key={key}>
                       
                        <td data-label='#'>{key + 1}</td>
                        <td data-label = 'Id'>
                        <input type="text" className='addSchedule-input' 
                       name='id' required
                       value={editId}
                      />
                        </td>
                        <td data-label = 'User id'>{schedule.userId}</td>
                        <td data-label = 'Profile id'>{schedule.profileId}</td>
                        <td data-label = 'Shift'>
                        <select name="shift" id="addScheduleSelect" 
                            onChange={e => setShift(e.target.value)}
                            required >
                            <option value="">Select a shift</option>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                      </select>
                      </td>
                      <td data-label = 'Date'>
                      <input type="date" className='addSchedule-input' 
                       name='selectedDate' required
                       onChange={e => setUpdatedDate(e.target.value)}
                      />
                      </td>
                      <td data-label = 'Start'>{schedule.start}</td>
                        <td data-label = 'End'>{schedule.end}</td>
                        <td data-label = 'Appointments'>{schedule.scheduleAppointments}</td>
                        <td data-label='Edit'>
                            <button className="update-button edit-icon" onClick={handleUpdate}>Edit</button>
                        </td>
                        
                        </tr>
                        :
                        <tr key={key}>
                        <td data-label='#'>{key + 1}</td>
                        <td data-label = 'Id'>{schedule.id}</td>
                        <td data-label = 'User id'>{schedule.userId}</td>
                        <td data-label = 'Profile id'>{schedule.profileId}</td>
                        <td data-label = 'Shift'>{schedule.shift}</td>
                        <td data-label = 'Date'>{schedule.date}</td>
                        <td data-label = 'Start'>{schedule.start}</td>
                        <td data-label = 'End'>{schedule.end}</td>
                        <td data-label = 'Appointments'>{schedule.scheduleAppointments}</td>
                        <td data-label='Edit'>
                            <button className="edit-button" onClick={()=>handleEdit(schedule.id)}><i className="bi bi-pen-fill edit-icon"></i></button>
                        </td>
                        <td data-label='Delete'>
                            <button  className="delete-btn" onClick={() => deleteConfirm(schedule.id)}><i className="bi bi-calendar-x-fill delete-icon"></i></button>
                        </td>
                        <td data-label='View Appointments'>
                        {props.isStaff ?
                                 <Link to={`/staffAppointments/${schedule.date}`} className="portofolios-link link-item"><i className="bi bi-binoculars-fill users-table-icon"></i>Appointments</Link>
                                 :
                                 ""
                                }
                        </td>
                        </tr>
                        }
                  </>    
                    )}
    
                </tbody>
                </table>

            </div>
           
         </div>
         
         <Footer></Footer></>
        :<AddSchedule></AddSchedule>
    }
     
 </>
}
export default Schedules;
/*<button className="add-schedule-btn" 
            onClick={() => {setModalOpen(true);}}>New schedule</button>
             {modalOpen && <Modal setOpenModal={setModalOpen} />}
            */