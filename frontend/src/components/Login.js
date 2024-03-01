import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


import "../css/main.css";
import "../css/login.css";

const Login =()=>{
    const navigate = useNavigate();
    
    const [errMsg, setErrMsg] = useState(false);
    const [loginPassword, setLoginPasswordValue ]= useState("password");
    const [formData, setFormData] = useState({
        userName:'',
        password:''
    });
    const [user, setUser]= useState([]);
  
    useEffect(() => {
        setErrMsg("");
      }, [formData.userName, formData.password]);
      
    const toggleLoginPassword = () => {
        
        if (loginPassword === "password") {
          setLoginPasswordValue("text");
          return;
        }
        setLoginPasswordValue("password");
      };
    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setErrMsg('Please Fill in all Required Fields!');
            return;
        }

        try{
            const formdata={
                userName:formData.userName,
                password:formData.password
            }
            //console.log(formData.userName);
             axios.post(
                `http://localhost:80/BeautySalon/backend/controllers/Login.php/`,
                formdata )
                
                .then((result)=>{
                    let response = result.data;
                   
                    if(response.status === 'Invalid'){
                        
                        alert(response.message);
                    }else{
                        console.log(response.message);
                        let logUser = response.userlist.userdata;
                        //console.log("User");
                        //console.log(logUser);
                        setUser(logUser);
                        
                        let logUserName =logUser.userName;
                         localStorage.setItem("user",JSON.stringify(logUser));
                        alert(logUserName+',  you have successfully logged in');
                        navigate('/');
                    }
                })        
              
        }catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 409) {
      setErrMsg("Username Taken");
    } else {
      setErrMsg("Registration Failed");
    }
   
  }
    }
    return(
        <div className="container">
            {user &&
        <form  id="loginForm" onSubmit={submitForm} method='post'>
          
                <div className="login-form-group">
                    <h3 className="login-title">Login</h3>
                </div>
                
                <div className="login-form-group">
                    <span className="login-span">Username <span className="text-danger">*</span> </span>
                    <i className="bi bi-person-fill login-icon"></i>
                    <input type="text" className="login-input" 
                    name="userName" placeholder="Your username..."
                    onChange={onChangeInput}
                    value={formData.userName}/>
                    
                </div>
                <div className="login-form-group">
                    <span className="login-span">Password <span className="text-danger">*</span></span>
                    <i className="bi bi-lock-fill login-icon"></i>
                    <input  className="login-input" 
                    name="password" id="loginPassword" 
                    type={loginPassword}
                    placeholder="Your password..." required
                    onChange={onChangeInput}
                    value={formData.password}/>
                   
                    <span className="pass-login-span"  onClick={toggleLoginPassword}>
                        {loginPassword=== "password" ? (
                        <i className=" bi bi-eye-slash-fill " id="showEyeLogin"></i>
                        ) : (
                            <i className="bi bi-eye-fill" id="hideEyeLogin"></i>
                        )}
                            
                        </span>
                </div>
                <div className="login-form-group">
                {errMsg && <div className="err-msg">{errMsg}</div>}
               <button type="submit" className='login-submit' >Login</button>

                </div>
            
        </form>
        }
    </div>
    )
}
export default Login;