import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
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
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault(),
              fetch("http://localhost:3000/users/signin", {
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
                  localStorage.setItem("Token", "Bearer " + res.token);
                  navigate("/");
                });
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
