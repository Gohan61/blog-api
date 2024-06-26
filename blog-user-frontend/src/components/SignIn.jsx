import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../stylesheets/index.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [setLoginStatus, loginStatus] = useOutletContext();
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const fetchToken = (event) => {
    event.preventDefault();

    fetch("https://blog-api-backend-odin.fly.dev/users/signin", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.token !== undefined) {
          localStorage.setItem("Token", "Bearer " + res.token);
          localStorage.setItem("userID", res.userID);
          localStorage.setItem("username", res.username);
          setLoginStatus(true);
          navigate("/");
        } else {
          throw new Error("Error during authentication");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <h1>Sign in</h1>
      <form action="" method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={fetchToken}>
          Submit
        </button>
      </form>
      <p className="error">{error.message}</p>
    </>
  );
}
