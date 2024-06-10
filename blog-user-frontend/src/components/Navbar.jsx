import { Link } from "react-router-dom";
import "../stylesheets/navbar.css";
import { PropTypes } from "prop-types";

export default function Navbar({ loginStatus, setLoginStatus }) {
  return (
    <>
      <nav>
        <a href="/">The Blog</a>
        {loginStatus ? (
          <button
            onClick={() => {
              localStorage.removeItem("Token");
              localStorage.removeItem("username");
              localStorage.removeItem("userID");
              setLoginStatus(false);
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to={"signin"}>Sign in</Link>
            <Link to={"signup"}>Sign up</Link>
          </>
        )}
        <Link to={"posts"}>Posts</Link>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  loginStatus: PropTypes.bool,
  setLoginStatus: PropTypes.func,
};
