import {React, useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';



import "../css/main.css";
import "../css/viewPortofolio.css";


import Footer from './Footer';

const ViewPortofolio =()=>{
    const {id} = useParams();
    const [portofolios, setPortofolios]= useState([]);
    const[jobTitle, setJobTitle]= useState('');
    const[profile, setProfile]=useState('')

    useEffect(() => {
        getPortofolios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function getPortofolios() {
        axios.get(`http://localhost:80/BeautySalon/backend/controllers/ViewPortofolios.php/${id}`).then(function(response) {
            
            setPortofolios(response.data.portofolios);
            let currentUser = response.data.portofolios[0];
            setProfile(currentUser.userName);
            setJobTitle(currentUser.name);
            console.log(currentUser.userName);
        });
    }
    const substr =(str)=>{
         return(str.substring(0, str.indexOf('-')));
    
    }
    return(<><div className="view-portofolio-container">
        {portofolios ?
            <div className="view-portofolios-cards">

                <div className="view-portofolios-title">
                    <h3 className='view-portofolio-list-title'>{profile} {' '}{jobTitle}{' '}portofolio</h3>
                </div>
                {portofolios.map((portofolio, key) => (
                    <div className="view-portofolio-card" key={key}>
                        <div className="view-portofolios-figure">
                            <img className="view-portofolios-img" src={"http://localhost:80/BeautySalon/backend/uploads/" + portofolio.image} alt={portofolio.title}/>
                        </div>
                        <div className="view-portofolio-content">
                            <h3 className="view-portofolio-title">{substr(portofolio.title)}</h3>
                            <p className="view-portofolio-description">{portofolio.description}</p>
                        </div>
                        <div className="view-portofolio-footer">
                            <Link to={`/appointment/${portofolio.profileId}`} class="link-item make-appointment">Make appointment</Link>
                        </div>
                    </div>
                ))}

            </div>


            :

            <div className="portofolios-cards">
                <h3 className="empty-msg"> No portofolio added yet! </h3>
            </div>}
    </div><Footer></Footer></>
    
    )
}
export default ViewPortofolio;