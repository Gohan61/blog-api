import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPosts(res);
      });
  }, [JSON.stringify(posts)]);

  const postItems = posts.map((element) => {
    return (
      <div className="post" key={element._id}>
        <h3 className="postTitle">{element.title}</h3>
        <p className="text">{element.text}</p>
        <p className="date">{element.date}</p>
        <p className="authorID" style={{ display: "none" }}>
          {element.authorID}
        </p>
      </div>
    );
  });

  return (
    <>
      <h2>All blog posts</h2>
      {postItems}
    </>
  );
}
