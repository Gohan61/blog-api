import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";

export default function Postdetail() {
  const [post, setPost] = useState("No post");
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [setLoginStatus, loginStatus] = useOutletContext();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${state.postID}`, {
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
        setPost(res);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(post)]);

  if (loading) {
    return <p>Loading post details</p>;
  }

  const comments =
    post.comments.length === 0 ? (
      <p>No comments</p>
    ) : (
      <div className="comments">
        {post.comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <p className="username">{comment.username}</p>
            <p className="timestamp">
              {comment.timestamp.toLocaleString("en-GB")}
            </p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    );

  return (
    <div className="postDetail" key={post.post._id}>
      <h1>{post.post.title}</h1>
      <p>
        {post.author["first_name"]} {post.author["last_name"]}
      </p>
      <p>{post.post.slice(0, post.post.date.indexOf("T"))}</p>
      <p>{post.post.text}</p>
      <p className="authorID" style={{ display: "none" }}>
        {post.post.authorID}
      </p>
      <h2>Comments</h2>
      {loginStatus ? (
        <Link
          to={`/comment/${post.post._id}`}
          state={{ postID: post.post._id }}
        >
          Add comment
        </Link>
      ) : (
        ""
      )}
      {comments}
    </div>
  );
}
