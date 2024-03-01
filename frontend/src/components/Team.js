import axios from "axios"
import {React,  useEffect, useState } from "react";
import { Link} from "react-router-dom";


import "../css/main.css";
import "../css/team.css";
import Footer from "./Footer";

const Team =()=>
{
    const [profiles, setProfiles]= useState([]);

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = async ()=>
    {
        try{
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/Team.php/`)
            .then(res => {
              console.log(res.data.profiles)
              setProfiles(res.data.profiles);
             
            })
        }catch(error){throw error}
    }

    return(
        <><main>
            <div className='team-container'>
                {!!profiles.length ?
                    <div className="team-cards">
                        {profiles.map((profile, key) =>(
                            <div className="card-item" key={key}>
                                <div className="team-image-box">
                                    <img src={"http://localhost:80/BeautySalon/backend/uploads/" + profile.image} className="team-image" alt={profile.image} />
                                </div>
                                <div className="card-content">
                                    <h3 className="name-title">{profile.fullName}</h3>
                                    <h3 className="job-title">{profile.name}</h3>
                                    <p className="about-text">{profile.about}</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={profile} className='link-item appointment-link'>Appointment</Link>
                                    <Link to={`/viewProfile/${profile.id}`} className='link-item team-profile-link'>About</Link>
                                    {profile.hasPortofolio === 1 ?
                                        <Link to={`/viewPortofolio/${profile.id}`} className='link-item portofolio-link'>Portofolio</Link> : ""}
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div className="team-card">
                        <h3 className="name-title" style={{ color: "red" }}></h3>
                    </div>}
            </div>
        </main><Footer></Footer></>
    )

}
export default Team;