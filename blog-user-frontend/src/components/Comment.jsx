import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatRelative, subDays } from "date-fns";

export default function Comment() {
  const { state } = useLocation();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const commentURL = `https://blog-api-backend-odin.fly.dev/comment/${state.postID}`;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${commentURL}`, {
      mode: "cors",
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        postID: state.postID,
        timestamp: formatRelative(subDays(new Date(), 6), new Date()),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Comment saved") {
          navigate(`/posts/${state.postID}`, {
            state: { postID: state.postID },
          });
        } else {
          throw new Error(res.errors.errors[0].msg);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <h1>Add comment</h1>
      <form action="" method="POST">
        <label htmlFor="text">Your comment:</label>
        <textarea
          type="text"
          id="text"
          name="text"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <p className="error">{error.message}</p>
    </>
  );
}
