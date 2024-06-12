import { useEffect, useState } from "react";

export default function HomePage() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("https://blog-api-backend-odin.fly.dev/", { mode: "cors" })
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
