import { useState } from "react";
import "../stylesheets/App.css";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

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
      <Outlet context={[setLoginStatus, loginStatus]}></Outlet>
    </>
  );
}

export default App;
