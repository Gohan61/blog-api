import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signup, setSignup] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://blog-api-backend-odin.fly.dev/users/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: signup.first_name,
        last_name: signup.last_name,
        username: signup.username,
        password: signup.password,
        author: false,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "You are signed up") {
          navigate("/");
        } else {
          const errorMessages = { errors: res.errors.errors };
          throw errorMessages;
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const errorMessages = error.errors
    ? error.errors.map((item) => {
        return (
          <p className="error" key={item.path}>
            {item.msg}
          </p>
        );
      })
    : "";

  return (
    <>
      <form action="" method="POST">
        <label htmlFor="first_name">First name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={(e) => setSignup({ ...signup, first_name: e.target.value })}
        />
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={(e) => setSignup({ ...signup, last_name: e.target.value })}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setSignup({ ...signup, username: e.target.value })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="authorPassword"
          name="authorPassword"
          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {errorMessages}
    </>
  );
}
