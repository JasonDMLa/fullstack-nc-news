import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";
import { UserContext } from "../contexts/UserContexts";
import { useContext,useState } from "react";
import { deleteCommentById } from "../utils";
import ErrorComponent from "./ErrorHandler";

const ShowComments = ({
  comments,
  setComments,
  commentVotes,
  setCommentVotes,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const upvoteComment = (commentId) => {
    setCommentVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] + 1,
    }));
  };

  const downvoteComment = (commentId) => {
    setCommentVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] - 1,
    }));
  };

  const handleDelete = (comment_id) => {
    deleteCommentById(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        alert("comment deleted");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <section className="single-article-comment-body">
      <h2>Comments:</h2>
      {comments.map((eachComment) => (
        <div className="each-comment" key={eachComment.comment_id}>
          <p>Author: {eachComment.author}</p>
          <p>Created at: {eachComment.created_at.split("T")[0]}</p>
          <p>Votes: {commentVotes[eachComment.comment_id] || 0}</p>
          <p>{eachComment.body}</p>
          <div>
            Vote on Comment:
            <button onClick={() => upvoteComment(eachComment.comment_id)}>
              <img
                src={UpArrow}
                alt="Upvote image"
                className="comment-arrow-image"
              />
            </button>
            <button onClick={() => downvoteComment(eachComment.comment_id)}>
              <img
                src={DownArrow}
                alt="Downvote image"
                className="comment-arrow-image"
              />
            </button>
          </div>
          {loggedInUser && loggedInUser.username === eachComment.author ? (
            <button onClick={() => handleDelete(eachComment.comment_id)}>
              delete
            </button>
          ) : (
            <p></p>
          )}
        </div>
      ))}
    </section>
  );
};

export default ShowComments;
