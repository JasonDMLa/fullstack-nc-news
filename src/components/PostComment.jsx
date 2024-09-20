import { useState } from "react";
import { postCommentToArticle, getAllUsers } from "../utils";
import ErrorComponent from "./ErrorHandler";

const PostComment = ({ article_id, setComments }) => {
  const [userNameInput, setUserNameInput] = useState("");
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const [displayBodyError, setDisplayBodyError] = useState(false);
  const [displayUsernameError, setDisplayUserNameError] = useState(false);
  const [error, setError] = useState(null);

  const submitComment = (e) => {
    e.preventDefault();
    getAllUsers()
      .then(({ users }) => {
        if (users.some((user) => user.username === userNameInput)) {
          if (commentBodyInput === "") {
            setDisplayBodyError(true);
          } else {
            const tempComment = {
              comment_id: Date.now(),
              author: userNameInput,
              body: commentBodyInput,
              votes: 0,
              created_at: new Date().toISOString(),
            };
            postCommentToArticle(article_id, userNameInput, commentBodyInput)
              .then(() => {
                setComments((prevComments) => [...prevComments, tempComment]);
              })
              .then(() => {
                setUserNameInput("");
                setCommentBodyInput("");
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });
          }
        } else {
          setDisplayUserNameError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  const handleUserChange = (e) => {
    setUserNameInput(e.target.value);
    setDisplayUserNameError(false);
  };

  const handleCommentChange = (e) => {
    setCommentBodyInput(e.target.value);
    setDisplayBodyError(false);
  };

  return (
    <div className="comment-container">
      <form onSubmit={submitComment}>
        <h1>Add a Comment: </h1>
        <label>UserName:</label>
        <input
          type="text"
          value={userNameInput}
          onChange={handleUserChange}
        ></input>
        {displayUsernameError && (
          <p className="error-text">*Enter a valid username*</p>
        )}
        <section>
          <label>Enter Comment: </label>
          <input
            type="text"
            value={commentBodyInput}
            onChange={handleCommentChange}
          ></input>
          {displayBodyError && <p className="error-text">*Enter a comment*</p>}
        </section>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostComment;
