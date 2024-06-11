import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostsForm() {
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/admin/posts", {
      mode: "cors",
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorID: localStorage.getItem("userID"),
        title: post.title,
        text: post.text,
        date: post.date,
        published: post.published,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Post saved") {
          navigate("/posts");
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
      <form action="" method="POST" className="postform">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <label htmlFor="text">Text</label>
        <textarea
          type="text"
          id="text"
          name="text"
          rows={20}
          cols={40}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={(e) => setPost({ ...post, date: e.target.value })}
        />
        <label htmlFor="published">Published</label>
        <input
          type="checkbox"
          id="published"
          name="published"
          onChange={(e) =>
            setPost({
              ...post,
              published: e.target.value === "on" ? true : false,
            })
          }
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {errorMessages}
    </>
  );
}
