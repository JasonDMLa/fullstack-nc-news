import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";

const ShowComments = ({ comments, commentVotes, setCommentVotes }) => {
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
              <img src={UpArrow} alt="Upvote image" className="comment-arrow-image" />
            </button>
            <button onClick={() => downvoteComment(eachComment.comment_id)}>
              <img
                src={DownArrow}
                alt="Downvote image"
                className="comment-arrow-image"
              />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShowComments;
