import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams,  Link} from "react-router-dom";

import Footer from "./Footer";

import "../css/main.css";
import "../css/appointments.css";
const Appointments =(props)=>{
    const {id} = useParams();
    const [appointments, setAppointments] = useState([]);
    const [departmentId, setDepartmentId]= useState('');
    

    const getAppointments = async () => {
        try {
            await axios.get(`http://localhost:80/BeautySalonTest/react-api/PHP/controllers/GetAppointmentsForStaff.php/${id}`)
            .then(res => {
                if(res.data.status === "Valid")
                {
                   // console.log(res.data.appointments);
                   setAppointments(res.data.appointments);
                    let firstRow = res.data.appointments[0];
                    setDepartmentId(firstRow.departmentId);
                    
                }else{
                    console.log(res.data.message);
                }
              
             
            })
          } catch (error) { throw error;}    
    }
    
     useEffect(() => {
        getAppointments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    return(<main>
         {appointments.length >0  ?
    <><div className="appointments-container">
                <div className="appointmentstable-header">
                    <h3 className="appointments-title">Appointments {props.userName} </h3>
                    <Link to={`/appointment/${id}/${departmentId}`} target="_blank" className="new-appointment-btn">New appointment</Link>
                </div>
                <div className="appointments-table-wrapper">
                    <table className="appointments-table responsive-appointments-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Profile id</th>
                                <th scope="col">Schedule id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Customer name</th>
                                <th scope="col">Customer email</th>
                                <th scope="col">Services</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((item, key) => <tr key={key}>
                                <td data-label='#'>{key + 1}</td>
                                <td data-label="Profile id">{item.profileId}</td>
                                <td data-label="Schedule id">{item.scheduleId}</td>
                                <td data-label="Date">{item.appointmentDate}</td>
                                <td data-label="Time">{item.appointmentTime}</td>
                                <td data-label="CustomerName">{item.customerName}</td>
                                <td data-label="Customer email">{item.customerEmail}</td>
                                <td data-label="Services">{item.services}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div><Footer></Footer></>:
    <div className="appointments-container">
        <div className="appointmentstable-header">
        <h3 className="appointments-title-error"> {props.userName} you have no appointments</h3>
        </div>
    </div>
}
    </main>)
}     
export default Appointments;