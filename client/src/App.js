import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Styles from "./components/styles.css"
import DashError from "./components/DashError";
function App() {

  const [data, setData] = useState(false); //to ensure that the home page is rendered after 2 seconds

  const navigate = useNavigate();

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
      navigate("/");
    } 
    else {
      navigate("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Header />

            <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashError" element={<DashError />} />

  
    <Route path="/dash" element={<Dashboard />} />
  

  <Route path="*" element={<Error />} />
</Routes>

          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;
