import React  from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import "../css/main.css";
import "../css/createPriceList.css";

const CreatePriceList = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [title, setTitle] =useState("");
    const [price, setPrice] = useState(0.0);
    const [priceList, setPriceList]= useState([]);
    const canSubmit = departmentId  && title && price ;
    useEffect(() => {
       getDepartment();
    }, []); 
    const getDepartment = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetDepartmentById.php/${id}`)
            .then(res => {
              console.log(res.data.departmentList)
              setDepartment(res.data.departmentList);
              setDepartmentId(res.data.departmentList.id);
             
            })
          } catch (error) { throw error;}    
    }
   

    const submit = async(event) => {
        event.preventDefault();
        if(!canSubmit ){
            return;
           
            }else{
                const formData = {
                    departmentId,
                    title,
                    price,
                    }
                    await axios.post(`http://localhost:80/BeautySalon/backend/controllers/CreatePriceList.php`, formData,{
                
            })
            .then((result)=>{
              
                if(result.data.status ==='Valid'){
                 
                    alert(result.data.message);
                    setTimeout( ()=>{               
                        navigate(`/adminPriceList/${id}`);
                    }, 1000);
                }  
                
            })
            .then((priceList) => {
            setPriceList(priceList);
              console.log(priceList);
            })
            .catch(err => console.log(err)) 
           }
                      
    }  

    return(<main>
        {priceList &&
        <div className="create-price-list-container">
            <form onSubmit={submit} id="createPriceListForm">
                <div className="create-price-list-form-group">
                    <h3 className="create-price-list-form-title">Form</h3>
                </div>
                <div className="create-price-list-form-group">
                    <span className='create-price-list-span' >{department.name}
                        <span className='text-danger'> *</span></span>
                        <input type="text" 
                            className="create-price-list-input" 
                            name="departmentId" 
                            defaultValue={id}
                            />
                </div>
                <div className="create-price-list-form-group">
                    <span className='create-price-list-span'>Title
                        <span className='text-danger'> *</span></span>
                    <input type="text" 
                    className="create-price-list-input" 
                    name="title" 
                     placeholder="add a unique title"
                     onChange={e => setTitle(e.target.value)}/> 
                </div>
                <div className="create-price-list-form-group">
                    <span className='create-price-list-span'>Price
                        <span className='text-danger'> *</span></span>
                    <input type="number"
                    step="0.1"
                   
                    className="create-price-list-input" 
                    name="title" 
                    placeholder="add a price"
                    onChange={e =>setPrice(e.target.value)} />
                </div>
               <div className="create-price-list-form-group">
                    <input type="submit" value="Create" className="submit-btn" />
                </div>
           
            </form>
        </div>
}
    </main>
        
    )

}
export default CreatePriceList;