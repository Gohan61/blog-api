import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/posts", {
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
        <Link to={element._id} state={{ postID: element._id }}>
          See details + comments
        </Link>
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
