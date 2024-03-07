
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.css'; 

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext); //using context api to get valid user(having token)
  const [error, setError] = useState(false);  //used when we dont get tokenized user

  const navigate = useNavigate();  //for nagivating between pages

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      setLoginData("");
      setError(true);
      navigate("*");
      console.log(data.error);
    } else {
      console.log("user verify");
      setLoginData(data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
    }, 2000);  //runs after 2 seconds only after 1st render(as we provided empty array)
  }, []);

  return (
    <>
      { !error ? (
        <div className="dashboard-container">
          <img src="./man.png" className="profile-image" alt="" />
          <h1>Student Email: {logindata ? logindata.ValidUserOne.email : ""}</h1>
          <hr />
          <div className='details_container'>
            Welcome {logindata.ValidUserOne.fname}!
          </div>
        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
