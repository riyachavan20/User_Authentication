import React, { createContext, useState } from 'react';

export const LoginContext = createContext("");
export const AnotherContext = createContext(""); 

const Context = ({ children }) => {
  const [logindata, setLoginData] = useState("");

  return (
    <>
      <LoginContext.Provider value={{ logindata, setLoginData }}>
          {children}
      </LoginContext.Provider>
    </>
  );
};

export default Context;
