import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css"

const Login = () => {

    const [passShow, setPassShow] = useState(false);  //to decide whether to show the password or hide it and accordingly display show and hide options.

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target; //destructuring name and value of target element. Here name corresponds to each field and value corresponds to the respective field's value that user enters while filling the form

        setInpval(() => {
            return {
                ...inpval, //spreading the input(retaining the rest of the target names and their values) of the form)
                [name]: value //updating the changed one
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault(); //preventing the form from default submission so as to apply validations from front-end

        const { email, password } = inpval; //fetching email and password from inpval through destructuring

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
             const data = await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({  //passing this data in the request
                     email, password
                })
            });

            const res = await data.json(); // fetching the response, storing it into res

            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token);
                navigate("/dash")
                setInpval({...inpval,email:"",password:""});
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Log In to your account</h1>
                        <p>Login to view your academic details.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}><span className='login'>Login</span></button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login