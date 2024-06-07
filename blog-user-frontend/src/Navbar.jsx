import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ loginStatus, setLoginStatus }) {
  return (
    <>
      {loginStatus ? (
        <button
          onClick={() => {
            localStorage.removeItem("Token");
            setLoginStatus(false);
          }}
        >
          Logout
        </button>
      ) : (
        <Link to={"signin"}>Sign in</Link>
      )}
    </>
  );
}
