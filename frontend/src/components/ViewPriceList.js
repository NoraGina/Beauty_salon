import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';


import "../css/main.css";
import "../css/viewPriceList.css";


const ViewPriceList = ()=>{
    
    const [departments, setDepartments] = useState([]);
    const [priceList, setPriceList] = useState([]);
    
    useEffect(() => {
        allDepartments();
        // setId(...departments, departments.id)
    }, []); 
    const allDepartments = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAllDepartments.php`)
            .then(res => {
              // console.log(res.data.departmentList)
              setDepartments(res.data.departmentList);
             
            })
          } catch (error) { throw error;}    
    }
    useEffect(() => {
        getPriceList();
        //console.log(priceList);
    }, []);

    const getPriceList = async () => {
        try {
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/ViewPricesList.php`)
            .then(async res => {
              if(res.data.status === "Valid"){
                const pricesList =res.data.priceList;
                // console.log(pricesList);
                 setPriceList(pricesList);
              }else{
                console.log(res.data.message);
              } 
             
            })
          } catch (error) { throw error;}    
    }
    
    const [isOpen, setIsOpen] = useState(null);
   
    return<>
    <main>
    <div className="accordion-container">
           {departments.map((department)=>
              <><details 
              onClick={() => setIsOpen(preOpen => preOpen === department.id ? null : department.id)}
           key={department.id} value={department.id}>
               <summary>{department.name}</summary>
             </details>
             {isOpen === department.id && <div className="accordion-content">
             <table className="view-price-list-table responsive-view-price-list-table">
                <thead>
                  <tr>
                      <th scope="col">Service</th>
                      <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                {priceList.filter(service=>service.departmentId === department.id)
                .map((item, key)=>
                <tr key={key}>
                  <td data-label="Service">{item.serviceName}</td>
                  <td data-label="Price">{item.price}</td>
                </tr>)}
                </tbody>
              </table>
              </div>}
               </>
           )}
         </div>
    </main>
    </>

}
export default ViewPriceList;
