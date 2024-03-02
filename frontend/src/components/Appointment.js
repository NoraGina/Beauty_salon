import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams,  Link} from "react-router-dom";

import "../css/main.css";
import "../css/appointment.css";

const Appointment =()=>
{
  
    const {id, departmentId} = useParams();
   
    const [schedule, setSchedule]= useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [owner, setOwner]  =useState('');
    const [profileImage, setProfileImg]= useState('');
    const [profileId, setProfileId] = useState('')
    const [services, setServices]= useState([]);
    const [appointments, setAppointments] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedTime, setSelectedTime] = useState('');
    const [service, setService] = useState([]);
    
    const [appointmentDate, setAppointmentDate] = useState('');
    const [scheduleId, setScheduleId] = useState('');
    const [checkedState, setCheckedState] = useState([]);
 
   
 
    const getSchedule = async () => {
      try {
         await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetScheduleForAppointment.php/${id}`)
          .then(res => {
            if(res.data.status === "Valid"){
              const schedules =res.data.schedulesList;
              
               setSchedule(schedules);
               let ownerSchedule = schedules[0];
               setOwner(ownerSchedule.userName);
               setProfileImg(ownerSchedule.image);
               setProfileId(ownerSchedule.profileId);
               
              
            }else{
              console.log(res.data.message);
            } 
           
          })
        } catch (error) { throw error;}    
  }
    
    useEffect(() => {
        getSchedule();
     
         // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);
    //`http://localhost:80/BeautySalonTest/react-api/PHP/controllers/GetPricesListForAppointment.php/${departmentId}`
    const getServices = async () => {
      try {
        await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetPricesListForAppointment.php/${departmentId}`)
         .then(res => {
           
           setServices(res.data);
           //console.log(res.data)
          const serviceLength =res.data.length
        let newArray =  new Array(serviceLength).fill(false);
      setCheckedState(newArray);
          
         })
       } catch (error) { throw error;}    
  }
  
  useEffect(() => {
      getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAppointments = async () => {
    try {
        await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAppointmentsByProfileId.php/${id}`)
        .then(res => {
            if(res.data.status === "Valid")
            {
               // console.log(res.data.appointments);
               setAppointments(res.data.appointments);
                

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
  
 
  const timeStringToMinutes = (timeStr, separator) => timeStr.split(separator).reduce((h, m) => h * 60 + +m);

  const minutesToTimeString = (minutes, separator) => {
      const minutesPart = (minutes % 60).toString().padStart(2, "0");
      const hoursPart = Math.floor(minutes / 60).toString().padStart(2, "0");
      return hoursPart + separator + minutesPart;
  }

  const  generateTimeSlots=(startStr, endStr) =>{
    let periodInMinutes = 60;
    let separator = ":";
      let startMinutes = timeStringToMinutes(startStr, separator);
      let endMinutes = timeStringToMinutes(endStr, separator);
      const oneDayInMinutes = 1440;
      if (endMinutes >= oneDayInMinutes)
          endMinutes = oneDayInMinutes - 1;
      if (startMinutes <= 0)
          startMinutes = 0;

      return Array.from({ length: Math.floor((endMinutes - startMinutes) / periodInMinutes) + 1 }, (_, i) =>
          minutesToTimeString(startMinutes + i * periodInMinutes, separator)
      );
  }

  const repaceGetTime=(string)=>{
    let lastIndex=string.lastIndexOf(':');
    let result = string.substring(0, lastIndex);
    return result;
  }
  const getFormattedPrice = (price) => `${price.toFixed(2)}`;
 
 


const onOptionChange = (e, date, itemId) => {
 
  setSelectedTime(e.target.value);
  setAppointmentDate(date);
  setScheduleId(itemId);
}

const handleOnChange = (position) => {

  const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );

  setCheckedState(updatedCheckedState);
  const totalPrice = updatedCheckedState.reduce(
    (sum, currentState, index) => {
      if (currentState === true) {
        return sum + services[index].price;
      }
      return sum;
    },
    0
  );
  let stored = updatedCheckedState.reduce((pV,currentState, index) => {
    if(currentState === true){
      return [...pV, services[index].serviceName];
    }
    return pV;
  },[])
  setTotal(totalPrice);
  setService(stored);
};

const filterByScheduleId = (id) => {
 
  const filteredAppointments = appointments.filter(
    (item) => item.scheduleId === id
  );
  return filteredAppointments.map((value)=>{
    return repaceGetTime(value.appointmentTime);
  });
};


const filterTimes = (startStr, endStr, id)=>{
  const times =  generateTimeSlots(startStr, endStr).filter((item)=>

   !filterByScheduleId(id).includes(item)
  );
  return times;
}


    return(
    <main>
      <div className="appointment-accordion-container">
    {schedule.length>0 ? 
       <><div className="appointment-header">
            <h3 className="appointment-title">MAKE APPOINTMENT {''}{owner}</h3>
            <div className="appointment-img-container">
                <img src={"http://localhost:80/BeautySalon/backend/uploads/" + profileImage} className="appointment-img" alt="" />
            </div>
          </div>
         {schedule.map((item, key)=>
            <><details key={key}
             value={item.id}
             onClick={() => setIsOpen(preOpen => preOpen === item.id ? null : item.id)}>
             <summary>{item.date}</summary>
           </details>
           {isOpen === item.id &&
            <div className="appointment-accordion-content">
              <form>
                  <div className="inputs-container">
                    <div className="owner-inputs">
                      <input type="text" name="profileId" value={item.profileId || ''} readOnly />
                      <input type="text" name="appointmentDate" value={item.date || ''} readOnly />
                      <input type="text" name="scheduleId" value={item.id || ''} readOnly />
                    </div>
                  </div>
                  <div className="checkboxes-container">
                    <div className="left-container">
                    <p>Choose a time</p>
                    <ul>
                      {Array.isArray(filterByScheduleId(item.id)) ?
                      (filterTimes(repaceGetTime(item.start),  repaceGetTime(item.end), item.id)
                             .map((time, key)=>
                             <li key={key}>
                              <label>
                              <input type="radio" 
                             name="appointmentTime" 
                             value={time} 
                             id={`custom-radio-${key}`}
                             onChange={(e, date, itemId) => onOptionChange(e,item.date, item.id)}/>
                             {time}
                              </label>
                             </li>)
                          
                      ) : (
                        generateTimeSlots(repaceGetTime(item.start), repaceGetTime(item.end)).map((time, key)=>
                        <li key={key}>
                        <label>
                        <input type="radio" 
                       name="appointmentTime" 
                       value={time} 
                       id={`custom-radio-${key}`}
                       onChange={(e, date, itemId) => onOptionChange(e,item.date, item.id)}/>
                       {time}
                        </label>
                       </li>
                        )
                      )}
                    </ul>
                    </div>
                      <div className="right-container">
                        <p>Choose a service</p>
                        <ul className="service-list">
                        {!!services &&
                            services.map(({ serviceName, price }, index)=>
                                        <li className="service-list-item" key={index}>
                                          <label htmlFor={`custom-checkbox-${index}`}>
                                              <input type="checkbox"
                                                name="service"
                                                id={`custom-checkbox-${index}`}
                                                value={serviceName}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)} />{serviceName}
                                            </label>

                                          <span className="right-section">{getFormattedPrice(price)}</span>
                                        </li>
                                    )}
                            <li>
                                <div className="service-list-item ">

                                  <span className="left-total">Total:</span>
                                  <span className="right-section">{getFormattedPrice(total)}</span>
                                </div>
                              </li>
                        </ul>
                      </div>
                  </div>
                  <div className="appointment-footer">
                  <Link to="/makeAppointment"
                          className="submit-appointment-btn"
                          state={{
                            profileId: profileId,
                            scheduleId: scheduleId,
                            appointmentDate: appointmentDate,
                            selectedTime: selectedTime,
                            service: service, departmentId: departmentId
                          }}
                        >
                          Make appointment</Link>
                  </div>
              </form>
             </div>
}
             </>
         )  
          }</>
       : <div appointment-accordion-header>
            <h3>No schedules</h3>
              <details>
                <summary>No schedules</summary>
              </details>
        </div>
      }
      </div>
      </main>
    )

}
export default Appointment;
/*{schedule.length>0 ?
             <div className="appointment-accordion-container">
              <div className="appointment-header">
                <h3 className="appointment-title">MAKE APPOINTMENT {''}{owner}</h3>
                <div className="appointment-img-container">
                    <img src={"http://localhost:80/BeautySalonTest/react-api/PHP/uploads/" + profileImage} className="appointment-img" alt="" />
                </div>
            </div>
              {schedule.map((item, key)=>
                <><details key={key} value={item.id}
                onClick={() => setIsOpen(preOpen => preOpen ===item.id ? null : item.id)}>
                 <summary>{item.date}</summary>
               </details>
               {isOpen === item.id &&
                <><div className="appointment-accordion-content">
                      <form>
                        <div className="inputs-container">
                          <div className="owner-inputs">
                            <input type="text" name="profileId" value={item.profileId || ''} readOnly />
                            <input type="text" name="appointmentDate" value={item.date || ''} readOnly />
                            <input type="text" name="scheduleId" value={item.id || ''} readOnly />
                          </div>

                        </div>
                        <div className="checkboxes-container">
                          <div className="left-container">
                            <p>Choose a time</p>
                            <ul> {Array.isArray(filterTestId(item.id)) ? (
                             generateTimeSlots(repaceGetTime(item.start), repaceGetTime(item.end))
                             .filter((filterTime)=>

                             filterTime !== filterTestId(item.id).map((appoint)=>appoint.appointmentTime)
                             )
                             .map((time, key)=>
                           <li key={key}> <label>
                             <input type="radio" 
                             name="appointmentTime" 
                             value={time} 
                             id={`custom-radio-${key}`}
                             onChange={(e, date, itemId) => onOptionChange(e,item.date, item.id)}/>{time}</label></li>
                             )
                              ) : (
                              <p>Please log in to continue.</p>
                              )}
                          </ul>
                        </div>
                        <div className="right-container">
                          <p>Choose a service</p>
                          <ul className="service-list">
                            {!!services && services.map(({ serviceName, price }, index) => <li className="service-list-item" key={index}>
                              <label htmlFor={`custom-checkbox-${index}`}>
                                <input type="checkbox"
                                  name="service"
                                  id={`custom-checkbox-${index}`}
                                  value={serviceName}
                                  checked={checkedState[index]}
                                  onChange={() => handleOnChange(index)} />{serviceName}
                              </label>

                              <span className="right-section">{getFormattedPrice(price)}</span>

                            </li>
                            )}
                            <li>
                              <div className="service-list-item ">

                                <span className="left-total">Total:</span>
                                <span className="right-section">{getFormattedPrice(total)}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div><div className="appointment-footer">
                        <Link to="/makeAppointment"
                          className="submit-appointment-btn"
                          state={{
                            profileId: profileId,
                            scheduleId: scheduleId,
                            appointmentDate: appointmentDate,
                            selectedTime: selectedTime,
                            service: service, departmentId: departmentId
                          }}
                        >
                          Make appointment</Link>
                      </div>
                  </form>
          </div>
               }}
         
             </div>:
             <div className="appointment-accordion-container">
              <h3>No schedules</h3>
              <details>
                <summary>No schedules</summary>
              </details>
             </div>
             }*/
/* onChange={() => {
                                              setCheckedServices((state) => ({
                                                ...state, // <-- shallow copy previous state
                                                [foundedService.id]: state[foundedService.id] // <-- update value by id
                                                  ? null
                                                  : {
                                                  id: foundedService.id,
                                                  serviceName: foundedService.serviceName, // <-- use name property
                                                  price: foundedService.price, // <-- use lastName property
                                                  
                                                }
                                              }));
                                            }}
         onChange={(e)=>handleChange(e,index, d)}                                   
             checked={checkedState[index]} 
              onClick={() => setAppointment({profileId:item.profileId,
                       scheduleId:item.id,
                       appointmentDate:item.date,
                       appointmentTime:selectedTime,
                       services:service})}       
                       onClick={() => {
                     
                      handleClick();   
                      display();
                    }}                       */
                    /*{  generateTimeSlots(repaceGetTime(item.start), repaceGetTime(item.end)).map((time, key)=>
                        
                          
                            <li key={key}> <label>
                             <input type="radio" 
                             name="appointmentTime" 
                             value={time} 
                             id={`custom-radio-${key}`}
                             onChange={(e, date, itemId) => onOptionChange(e,item.date, item.id)}/>{time}</label></li>
                             
                           )}*/