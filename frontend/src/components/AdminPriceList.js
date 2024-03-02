import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";

import "../css/main.css";
import "../css/adminPriceList.css";

import Footer from "./Footer";
import CreatePriceList from './CreatePriceList';

const AdminPriceList = ()=>{
    const {id} = useParams();
    
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [priceList, setPriceList] = useState([{id:0,
                                                departmentId:0,
                                                title:'',
                                                price:0.0
                                                    }]);

    const [editId, setEditId] = useState(-1);
    const [departmentId, setDepartmentId] = useState("");
    const [updatedTitle, setUpdatedTitle] =useState("");
    const [updatedPrice, setUpdatedPrice] = useState(0.0);
    useEffect(() => {
        allDepartments();
    }, []); 
    const allDepartments = async () => {
        try {
            axios.get(`http://localhost:80/BeautySalon/backend/controllers/GetAllDepartments.php`)
            .then(res => {
              console.log(res.data.departmentList)
              setDepartments(res.data.departmentList);
             
            })
          } catch (error) { throw error;}    
    }
    const  onSelect = e => {
        setDepartmentId(e.target.value[0]);
        console.log(e.target.value[0]);
    }
    useEffect(() => {
        getPriceList();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [{id}]);

    const getPriceList =   async () => {
        try {
           await axios.get(`http://localhost:80/BeautySalon/backend/controllers/AdminPricesList.php/${id}`)
            .then(res => {
              if(res.data.status === "Valid"){
                 setPriceList(res.data.priceList);
                 let row = res.data.priceList[0];
                 setDepartmentName(row.name);
              }else{
                let row = res.data.priceList;
                setDepartmentName(row.name)
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
            id: editId,
            departmentId:departmentId,
            title:updatedTitle,
            price:updatedPrice,
          }
          try {
          await axios.post(`http://localhost:80/BeautySalon/backend/controllers/EditPriceList.php/${editId}`, formData)
          .then(function(res){
            alert(res.data.message);
            setEditId('');
            getPriceList();
          })
    
          }catch (error) { throw error;}
    }
    
    const deletePriceList=(id)=>{ 
        axios.post(`http://localhost:80/BeautySalon/backend/controllers/DeletePriceList.php/${id}`)
        .then(result=>{
          if(result.data.status ==='Valid'){
            
              alert(result.data.message);
             getPriceList();
             }else{
            console.log(result.data.message);   
            alert(result.data.message);
          }
     }).catch(err=>console.log(err))}
    
     const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
          deletePriceList(id);
        }
      };
    return<>
    <main>
        {!!priceList ?
        <><div class="staff-price-list-container">
            <div class="table-header">
                <h3 class="staff-price-list-title">Price List {" "}{departmentName}</h3>
                <Link to={`/createPriceList/${id}`} class="new-price-list-btn">New price list</Link> 
            </div>
            <div class="table-wrapper">
            <table class="staff-price-list-table responsive-price-list-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Department</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceList.map((item, index)=>
                        <>{item.id === editId ?
                            <tr key={index}>
                                <td data-label='#'>{index + 1}</td>
                                <td data-label="Id">
                                    <input class="table-price-list-input" name='id' value={editId} />
                                </td>
                                <td data-label="Department">
                                <select name="departmentId" 
                                 class="table-price-list-select"
                                 required
                                 onChange={onSelect}>
                                    <option value="">Select a department</option>
                                    {departments.map((depart, key)=>
                                        <><option key={key} value={depart.id}>{depart.name}</option>
                                        </>
                                    )}
                                </select>
                                </td>
                                <td data-label="Title">
                                    <input class="table-price-list-input" 
                                    name='updatedTitle' 
                                    required
                                    onChange={e => setUpdatedTitle(e.target.value)}/>
                                </td>
                                <td data-label="Price">
                                    <input type="number"
                                    step="0.1"
                                    min="0"
                                    max="20"  
                                    className="create-price-list-input" 
                                    name="updatedPrice" 
                                    placeholder="add a price"
                                    required
                                    onChange={e => setUpdatedPrice(e.target.value)}/> 
                                </td>
                                <td data-label='Edit'>
                                <button className="update-button" onClick={handleUpdate}>Edit</button>
                                </td>
                            </tr>
                        :<tr key={index}>
                            <td data-label='#'>{index + 1}</td>
                            <td data-label="Id">{item.id}</td>
                            <td data-label="Department">{item.name}</td>
                            <td data-label="Name">{item.serviceName}</td>
                            <td data-label="Price">{item.price}</td>
                            <td data-label="Edit"><i class="bi bi-pencil-fill edit-icon" onClick={()=>handleEdit(item.id)}></i></td> 
                            <td data-label="Delete"><i class="bi bi-trash-fill delete-icon" onClick={() => deleteConfirm(item.id)}></i></td>
                        </tr>}
                        </>)
                        }
                    </tbody>
            </table>
            </div>
        </div>
            <Footer></Footer></>
        :<CreatePriceList></CreatePriceList>}
    </main>
    </>

}
export default AdminPriceList;