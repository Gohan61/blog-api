import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  fetch("http://localhost:3000/", { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setTitle(response);
    });
  return (
    <>
      <h1>Welcome to {`${title}`}</h1>
    </>
  );
}

export default App;
