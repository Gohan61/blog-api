import { useEffect, useState } from "react";

export default function HomePage() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/", { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTitle(response);
      });
  }, [title]);

  return (
    <>
      <h1>Welcome to {`${title}`}</h1>
    </>
  );
}
