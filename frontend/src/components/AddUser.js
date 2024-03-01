import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "../css/main.css";
import "../css/addUser.css";

const AddUser = (props)=>{
    const navigate = useNavigate();
   
    const [input, setInput] = useState({
        fullName:'',
        userName: '',
        email:'',
        password: '',
        confirmPassword: ''
      });
     
      const [user, setUser] =useState([]);
    
      const [error, setError] = useState({
        fullName:'',
        userName: '',
        email:'',
        password: '',
        confirmPassword: '',
        role:''
      });
      const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
      };
      const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "fulName":
                if(!value){
                    stateObj[name]="Please enter  fullName"
                }
                break;
            case "username":
              if (!value) {
                stateObj[name] = "Please enter Username.";
              }
              break;
              case "email":
              if (!value) {
                stateObj[name] = "Please enter email.";
              }
              break;
     
              case "password":
                if (!value) {
                  stateObj[name] = "Please enter Password.";
                } else if (input.confirmPassword && value !== input.confirmPassword) {
                  stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                } else {
                  stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                }
                break;
       
              case "confirmPassword":
                if (!value) {
                  stateObj[name] = "Please enter Confirm Password.";
                } else if (input.password && value !== input.password) {
                  stateObj[name] = "Password and Confirm Password does not match.";
                }
                break;
                case "role":
                 if (!value) {
                stateObj[name] = "Please check a role.";
                }
               break;
              default:
              break;
          }
     
          return stateObj;
        });
      }

      const [password, setPasswordValue ]= useState("password");
      const [confirmPass, setConfirmPassValue] =useState("password");
      const toggle = () => {
        
        if (password === "password") {
          setPasswordValue("text");
          return;
        }
        setPasswordValue("password");
      };
      const toggle2 = () => {
        
        if (confirmPass === "password") {
          setConfirmPassValue("text");
          return;
        }
        setConfirmPassValue("password");
      };
        
     
      const handleSubmit = (event) => {
        event.preventDefault();
        if(!validateInput){
            return;
           
            }else{
              const setInput ={
                fullName:input.fullName,
                userName:input.userName,
                email:input.email,
                password:input.password,
                role:input.role
            }
            axios.post('http://localhost:80/BeautySalon/backend/controllers/AddUser.php/', setInput)
            .then((result)=>{
              let response = result.data;
              console.log(response.status);
                if(response.status ==='Valid'){
                  alert(input.userName+ " "+response.message);
                  setTimeout( ()=>{               
                    navigate('/users');
                }, 1000);
                    
                }else{
                  console.log(response.message);   
                  alert(input.userName+" "+response.message);
                }
            })
            .then((user) => {
              setUser(user);
              console.log(user);
            })
            .catch(err => console.log(err)) 
           }

                      
    }    
     return<div className='addUser-container' >
      {user&&<>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form action='signup' id='addUserForm' onSubmit={handleSubmit}>
                <div className="addUser-form-group">
                    <h3 className='addUser-title'>Registration </h3>
                </div>
                <div className="addUser-form-group">
                    <span className='addUser-span'>Full name
                    <span className='text-danger'> *</span>
                    </span>
                    <input type="text" id="fullName" name="fullName" 
                    className="addUser-input" placeholder="Your name.." required
                    value={input.fullName}
                     onChange={onInputChange}
                     onBlur={validateInput}/>
                      {error.fullName && <span className='signup-err'>{error.fullName}</span>}
                </div>      
                <div className='addUser-form-group'>
                    <span className='addUser-span'>Username
                    <span className='text-danger'> *</span>
                    </span>
                    <input type="text" id="username" name="userName"
                     className="addUser-input" 
                     placeholder="Your username.." required
                     value={input.userName}
                     onChange={onInputChange}
                     onBlur={validateInput}/>
                     {error.userName && <span className='addUser-err'>{error.userName}</span>}
                </div>
                <div className='signup-form-group'>
                    <span className='addUser-span'>Email
                    <span className='text-danger'> *</span>
                    </span>
                    <input type="email" id="email" name="email" 
                    className="addUser-input" placeholder="Your @email..."
                     required
                     value={input.email}
                     onChange={onInputChange}
                     onBlur={validateInput}/>
                     {error.email && <span className='addUser-err'>{error.email}</span>}
                </div>
                <div className='addUser-form-group'>       
                    <span className='addUser-span'>Password
                    <span className='text-danger'> *</span>
                    </span> 
                    <input type={password} id="password" 
                    name="password" className="addUser-input pass-input" 
                    placeholder='Your password...'  required
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}/>
                    {error.password && <span className='addUser-err'>{error.password}</span>}
                        <span className="addUser-pass-span"  onClick={toggle}>
                        {password === "password" ? (
                        <i className=" bi bi-eye-slash-fill " id="showEyeSignup"></i>
                        ) : (
                            <i className="bi bi-eye-fill" id="hideEyeSignup"></i>
                        )}
                            
                        </span>
                </div>
                <div className='addUser-form-group'> 
                    <span className='addUser-span'>Confirm password
                    <span className='text-danger'> *</span>
                    </span> 
                    <input type={confirmPass} id="confirmPassword" name="confirmPassword"
                     className="addUser-input pass-input" placeholder="Re type password.."
                      required
                      value={input.confirmPassword}
                      onChange={onInputChange}
                      onBlur={validateInput}/>
                      {error.confirmPassword && <span className='addUser-err'>{error.confirmPassword}</span>}
                        <span className="addUser-pass-span"  onClick={toggle2}>
                        {confirmPass === "password" ? (
                        <i className=" bi bi-eye-slash-fill " id="showEyeSignup"></i>
                        ) : (
                            <i className="bi bi-eye-fill" id="hideEyeSignup"></i>
                        )}
                        </span>
                </div>
                {!!props.isAdmin&&<>
                  <div className='addUser-form-group'>
                  <span className='saddUser-span'>Role
                    <span className='text-danger'> *</span>
                    </span>
                   
                    
                    <input type="checkbox" name="role" id="staff" 
                     value="STAFF"
                     checked={input.role === "STAFF"}
                     onChange={onInputChange}
                     onBlur={validateInput}/>
                     {error.role && <span className='addUser-err'>{error.role}</span>}
                     <label htmlFor="staff">STAFF</label>
                     &nbsp;
                     <input type="checkbox" name="role" id="admin" 
                     value="ADMIN"
                     checked={input.role === "ADMIN"}
                     onChange={onInputChange}
                     onBlur={validateInput}/>
                     {error.role && <span className='addUser-err'>{error.role}</span>}
                     <label htmlFor="staff">ADMIN</label>
                  </div>
                </>}
                <div className='addUser-form-group'> 
                    <span className='addUser-span'></span> 
                    <button type="submit" className="addUser-btn">Submit</button>
                </div>
                
            </form>
           </>}
    </div>
}
export default AddUser;