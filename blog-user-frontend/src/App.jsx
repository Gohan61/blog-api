import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const [loginStatus, setLoginStatus] = useState(() => {
    if (localStorage.getItem("Token")) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <Navbar
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      ></Navbar>
      <Outlet context={[setLoginStatus]}></Outlet>
    </>
  );
}

export default App;
