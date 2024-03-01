import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import "../css/main.css";
import "../css/home.css";

const Home =(props)=>{
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const [openMessage, setOpenMessage] = useState("");
    const [appMessage, setAppMessage]  = useState("");
    const [today, setToday] = useState(new Date());
    const [profiles, setProfile] = useState([{}]);
    useEffect(() => {
        getDate();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getDate()
    {
        const freeDays =[new Date("2024-01-01"),
new Date("2024-01-02"),
new Date("2024-01-06"),
new Date("2024-01-07"),
new Date("2024-01-24"),
new Date("2024-05-01"),
new Date("2024-05-03"),
new Date("2024-05-05"), 
new Date("2024-05-06"), 
new Date("2024-06-01"), 
new Date("2024-06-23"), 
new Date("2024-05-24"), 
new Date("2024-08-15"),
new Date("2024-11-30"),
new Date("2024-12-01"), 
new Date("2024-12-25"), 
new Date("2024-12-26"),
new Date("2025-01-01"),
new Date("2025-01-02")];

        setToday(new Date());
        let currentDay = today.getDay();
        let currentHour = today.getHours();
        let currentMinutes = today.getMinutes();
        let minutesToOpen = 60-currentMinutes;

        let nextDate = new Date();
         nextDate.setDate(today.getDate()+1);
         let nextNextDate = new Date();
         nextNextDate.setDate(today.getDate()+2);
         let nextNextNextDate = new Date();
         nextNextNextDate.setDate(today.getDate()+3);

         let nextDat = nextDate.getDate();
         let nextNextDat = nextNextDate.getDate();
         let nextNextNextDat = nextNextNextDate.getDate();

         let mN = nextDate.getMonth() + 1;
         let mNN = nextNextDate.getMonth()+1;
         let mNNN = nextNextNextDate.getMonth()+1;
         let nextMonth= changeMonth(mN);
         let nextNextMonth = changeMonth(mNN);
         let nextNextNextMonth = changeMonth(mNNN);

         let nextDay = changeDay(nextDate.getDay());
         let nextNextDay = changeDay(nextNextDate.getDay());
         let nextNextNextDay = changeDay(nextNextNextDate.getDay());

         
          let nextDateMessage="It will be open "+nextDay+" "+nextDat+" "+nextMonth+" at seven";
          let nextNextDateMessage = "It will be open "+nextNextDay+" "+nextNextDat+" "+nextNextMonth+" at seven";
          let nextNextNextDateMessage = "It will be open "+nextNextNextDay+" "+nextNextNextDat+""+nextNextNextMonth+" at seven";
          let todayMessage = "OPEN FROM 7:00 TO 19:00";
          let tomorowMessage = "Today it is close will be open tomorrow at 7";
             
          let nextAppMessage = "will work on "+nextDay+" "+nextDat+" "+nextMonth+" from 7:00 to 13:00";
          let currentMesage = " is working at this moment";
          let tomorowAppMessage = " will work tomorow from 7:00 to 13:00";
          let willWork = " will work from  7:00";
          if(!isDateInArray(today, freeDays))
          {
            if(currentDay === 0)
            {
                if(!isDateInArray(nextDate, freeDays)){
                    setOpenMessage(tomorowMessage);
                    setAppMessage(tomorowAppMessage);
                    
                }else if(currentDay === 6)
                {
                    if(currentHour >=7 && currentHour <=13){
                       let message ="It is open until 13:00";
                        setOpenMessage(message);
                        setAppMessage(currentMesage);
                      }else{
                        if(isDateInArray(nextDate, freeDays) && !isDateInArray(nextNextDate, freeDays)){
                        setOpenMessage(nextDateMessage);
                        setAppMessage(nextAppMessage);
                        }else{
                            setOpenMessage(nextNextNextDateMessage);
                        
                        }
                      }
                }
                else{
                    if(!isDateInArray(nextNextDate, freeDays))
                    {
                        setOpenMessage(nextNextDateMessage);
                        
                    }else{
                        setOpenMessage(nextNextNextDateMessage)
                        
                    }
                }
            }else{
                if(currentHour<7 || currentHour>=19)
                {
                    if(currentHour >7 ){
                        let timeDifference = 24-currentHour;
                        let timeToOpen =(timeDifference+7)-1;
                        let message = "It will be open in "+ timeToOpen+" hours and "+minutesToOpen+" minutes";
                        setOpenMessage(message);
                        setAppMessage(willWork);
                    }else{
                        let timeToOpen = (7 - currentHour)-1;
                        let message= "It will be open in "+ timeToOpen+" hours and "+minutesToOpen+" minutes";
                        setOpenMessage(message);
                        setAppMessage(willWork);
                    }
                }else if(currentHour > 19){
                    if(!isDateInArray(nextDate, freeDays)){
                        setOpenMessage(tomorowMessage)
                    }else{
                        if(!isDateInArray(nextNextDate, freeDays))
                        {
                            setOpenMessage(nextNextDateMessage);
                            
                        }else{
                            setOpenMessage(nextNextDateMessage)
                            
                        }
                    }
                }else{
                    setOpenMessage(todayMessage);
                    setAppMessage(currentMesage);
                }
            }
        
          }else{
            
                if(!isDateInArray(nextDate, freeDays))
                {
                    if(nextDay === 0){
                       if(!isDateInArray(nextNextDate, freeDays))
                       {
                        setOpenMessage(nextNextDateMessage);
                        
                       }else{
                        setOpenMessage(nextNextNextDateMessage)
                        
                       }
                    }else{
                        setOpenMessage(nextDateMessage);
                      
                    }
                } else{
                    setOpenMessage(nextNextDateMessage);
                  
                }  
                
            
          }
    }

    function isDateInArray(date, array) {
        return array.some((item) => item.toISOString() === date.toISOString());
    }

    function changeDay(dayEntered){
        let day="";
        switch (dayEntered) {
            case 0:
              day = "Sunday";
              break;
            case 1:
              day = "Monday";
              break;
            case 2:
               day = "Tuesday";
              break;
            case 3:
              day = "Wednesday";
              break;
            case 4:
              day = "Thursday";
              break;
            case 5:
              day = "Friday";
              break;
            case 6:
              day = "Saturday";
              break;
            default:
                day="Monday";
          }
          return day;
    }
    
    function changeMonth(monthEntered)
    {
        let month = "";
        switch (monthEntered) {
            case 1:
              month = "January";
              break;
            case 2:
              month = "February";
              break;
            case 3:
               month = "March";
              break;
            case 4:
              month = "April";
              break;
            case 5:
              month = "May";
              break;
            case 6:
              month = "June";
              break;
            case 7:
              month = "July";
              break;
              case 8:
              month = "August";
              break;
            case 9:
              month = "September";
              break;
            case 10:
               month = "October";
              break;
            case 11:
              month = "November";
              break;
            case 12:
              month = "December";
              break;
            default:
                month ="January";
          }
          return month;
    }

    useEffect(() => {
        getCurrentProfiles();
    }, []);
    const getCurrentProfiles = async () => {
        try {
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/CurrentProfiles.php/`)
            .then(res => {
              
              setProfile(res.data.profiles);
              console.log(res.data.profiles)
             
            })
          } catch (error) { throw error;}    
    }

    
return(<main>
    {!!props.isAdmin ?
            <div className='home-container'>
            <h1>Beauty salon</h1>
                    <p>Lorem ipsum dolor sit ametea commodo consequat.</p>
                    <Link to={`/users/`} ><i className="bi bi-people-fill"></i>My Team</Link>
            </div>:
        !!props.isStaff ?
            <div className='home-container'>
            <h1>Beauty salon {user.userName}</h1>
                    
            </div>  
        :<><div className='home-container'>
                    <h1>Beauty salon</h1>
                    <p>{openMessage}</p>
                    <Link to={`/team`}><i className="bi bi-people-fill"></i>Our Team</Link>
                </div>
                <div className="blank content-text">

                        <p className="content"><span className="first-letter red">M</span>
                            <span className="rest-text">eet our team that {appMessage}</span></p>

                    </div>
                    <div className="second">
                        {!!profiles ?
                            <div className="cards">
                                {profiles.map((profile, key) => (
                                    <div className="item" key={key}>
                                        <div className="back">
                                            <h3>{profile.fullName}</h3>
                                            <h2>{profile.name}</h2>
                                            
                                            <p>
                                                <Link to={`/appointment/${profile.id}/${profile.departmentId}`} className='link-profile'>Appointment</Link>
                                                <Link to={`/viewProfile/${profile.id}`} className='link-profile'>About</Link>
                                                {profile.hasPortofolio === 1?
                                                <Link to={`/viewPortofolio/${profile.id}`} className='link-profile'>Portofolio</Link>:""
                                                }
                                                
                                            </p>
                                        </div>
                                        <div className="front">
                                            <div className="image-box">
                                                <img src={"http://localhost:80/BeautySalon/backend/uploads/" + profile.image} className="image" alt={profile.image} />
                                                <h2>{profile.name}</h2>
                                                <h3>{profile.fullName}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            : <div className="cards">
                                <h3 className="empty-msg"> No profile added yet! </h3>
                            </div>}
                    </div></>
        }
    </main>)
}
export default Home;