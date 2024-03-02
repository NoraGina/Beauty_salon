import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams,  Link } from "react-router-dom";

import "../css/main.css";
import "../css/staffPortofolios.css";
import Footer from './Footer';
import AddPortofolio from './AddPortofolio';

const StaffPortofolios = ()=>{
   
   
    const [portofolios, setPortofolio] = useState([{}]);
   const [userName, setUserName]= useState('');
   const [jobTitle, setJobTitle] =useState('');
   const [userId, setUserId]= useState('');
   const [profileId, setProfileId] = useState('');
  
    const {id} = useParams();
   
    
  
  function refreshPage() {
    window.location.reload(false);
  }
    useEffect(() => {
        getPortofolios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPortofolios = async () => {
        try {
            await axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetPortofoliosStaff.php/${id}`)
            .then(res => {
                if(res.data.status === "Valid")
                {
                    console.log(res.data.portofolios);
                   setPortofolio(res.data.portofolios);
                    let currentUser = res.data.portofolios[0];
                   setUserName(currentUser.userName);
                   setJobTitle(currentUser.name);
                   setUserId(currentUser.userId);
                   setProfileId(currentUser.profileId);

                }else{
                    console.log(res.data.message);
                }
              
             
            })
          } catch (error) { throw error;}    
    }
    
    const deletePortofolio = (id) => {
       
        axios.post(`http://localhost:80/BeautySalon/backend/controllers/DeletePortofolio.php/${id}/${profileId}/${userId}`)
        .then(function(response){
            refreshPage();
        });
    }

    return <>

        {!!portofolios.length  ?
        <div className="portofolios-container">
            <div className="portofolios-table-caption">
                <h3 className="portofolios-table-title"> {userName} {' '} {jobTitle}{' '}Portolios list
                    <Link to={`/addPortofolio/${id}`} className="add-portofolio-btn">New portofolio</Link>
                </h3>
            </div>
                <div className="portofolios-table-container">
                    <table className="portofolios-table responsive-portofolios-table">
                        <thead className="portofolios-header">
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Id</th>
                                <th scope='col'>Profile id</th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Image</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Edit</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portofolios.map((item, key) => <tr key={key}>
                                <td data-label='#'>{key + 1}</td>
                                <td data-label='Id'>{item.id}</td>
                                <td data-label='Id'>{item.profileId}</td>
                                <td data-label='Title'>{item.title}</td>
                                <td data-label='Image' className='clearfix'>

                                    <img className="portofolios-img" src={"http://localhost:80/BeautySalon/backend/uploads/" + item.image} alt={item.title} />
                                    <p className='portofolios-figcaption'>{item.image}</p>

                                </td>
                                <td data-label='Description'>{item.description}</td>
                                <td data-label='Edit'>
                                    <Link to={`/editPortofolio/${item.id}`}>
                                        <i class="bi bi-pen-fill edit-icon"></i>
                                    </Link></td>
                                <td data-label='Delete'>
                                    <button onClick={() => deletePortofolio(item.id)} className="delete-btn"><i className="bi bi-file-earmark-minus-fill delete-icon"></i></button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>

                </div>
                <Footer></Footer>
                </div>
            
            
            : <AddPortofolio></AddPortofolio>
            }
    </>
        }
export default StaffPortofolios;

/*
if(props.isAdmin){
                    setTimeout( ()=>{               
                        navigate(`/staffPortofolios/${userId}`);
                  }, 2000);
                   }else{
                    setTimeout( ()=>{               
                      navigate(`/staffPortofolios/${userId}`);
                  }, 2000);
                   }
*/