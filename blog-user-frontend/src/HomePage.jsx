import { useState } from "react";

export default function HomePage() {
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
