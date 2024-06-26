import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useOutletContext,
  useNavigate,
} from "react-router-dom";

export default function Postdetail() {
  const [post, setPost] = useState("No post");
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [setLoginStatus, loginStatus] = useOutletContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-api-backend-odin.fly.dev/admin/posts/${state.postID}`, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Token"),
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

  const handlePublish = (e) => {
    e.preventDefault();

    fetch(
      `https://blog-api-backend-odin.fly.dev/admin/posts/publish/${state.postID}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message !== "Post deleted") {
          throw new Error("Comment not found");
        } else {
          navigate("/posts");
        }
      })
      .catch((err) => {
        setError(err.msg);
      });
  };

  const handleCommentDelete = (e) => {
    e.preventDefault();

    fetch(
      `https://blog-api-backend-odin.fly.dev/admin/posts/comment/${e.target.id}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message !== "Comment deleted") {
          throw new Error("Comment not found");
        } else {
          const deleteComment = post.comments.findIndex((comment) => {
            return comment._id === e.target.id;
          });
          const newPost = { ...post };
          newPost.comments.splice(deleteComment, 1);
          setPost(newPost);
        }
      })
      .catch((err) => {
        setError(err.msg);
      });
  };

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
            <p className="commentText">{comment.text}</p>
            <button id={comment._id} onClick={(e) => handleCommentDelete(e)}>
              Delete comment
            </button>
            {error}
          </div>
        ))}
      </div>
    );

  return (
    <div className="postDetail" key={post.post._id}>
      <h1>{post.post.title}</h1>
      <p className="published">
        {post.post.published ? "Published" : "Not published"}
      </p>
      <p className="author">
        {post.author["first_name"]} {post.author["last_name"]}
      </p>
      <p className="datePost">
        {post.post.date.slice(0, post.post.date.indexOf("T"))}
      </p>
      <p>{post.post.text}</p>
      <p className="authorID" style={{ display: "none" }}>
        {post.post.authorID}
      </p>
      <button onClick={(e) => handlePublish(e)}>
        {post.post.published ? "Unpublish" : "Publish"}
      </button>
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
