import { useState } from "react";
import { postCommentToArticle, getAllUsers } from "../utils";

const PostComment = ({ article_id, setComments }) => {
  const [userNameInput, setUserNameInput] = useState("");
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const [displayBodyError, setDisplayBodyError] = useState(false);
  const [displayUsernameError, setDisplayUserNameError] = useState(false);

  const handleUserChange = (e) => {
    setUserNameInput(e.target.value);
    setDisplayUserNameError(false);
  };

  const handleCommentChange = (e) => {
    setCommentBodyInput(e.target.value);
    setDisplayBodyError(false);
  };

  const submitComment = (e) => {
    e.preventDefault();
    getAllUsers().then(({ users }) => {
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
            });
        }
      } else {
        setDisplayUserNameError(true);
      }
    });
  };

  return (
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
        <label>Enter Comment Here: </label>
        <input
          type="text"
          value={commentBodyInput}
          onChange={handleCommentChange}
        ></input>
        {displayBodyError && <p className="error-text">*Enter a comment*</p>}
      </section>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default PostComment;
