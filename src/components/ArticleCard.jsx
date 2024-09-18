import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils";
import { getCommentsByArticleId } from "../utils";
import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";
import { postCommentToArticle } from "../utils";
import { getAllUsers } from "../utils";
import { patchVotesByArticleId } from "../utils";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [commentVotes, setCommentVotes] = useState();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [userNameInput, setUserNameInput] = useState("");
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const [displayBodyError, setDisplayBodyError] = useState(false);
  const [displayUsernameError, setDisplayUserNameError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setLoadingPage(false);
        setArticlePage(article[0]);
        setArticleVotes(article[0].votes);
      })
      .then(() => {
        return getCommentsByArticleId(article_id);
      })
      .then(({ comments }) => {
        setLoadingComments(false);
        setComments(comments);
        const InitialCommentVotes = [];
        comments.forEach((comment) => {
          InitialCommentVotes[comment.comment_id] = comment.votes;
        });
        setCommentVotes(InitialCommentVotes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const upvoteArticle = () => {
    setArticleVotes((prevVotes) => prevVotes + 1);
    patchVotesByArticleId(article_id,1)
  };

  const downvoteArticle = () => {
    setArticleVotes((prevVotes) => prevVotes - 1);
    patchVotesByArticleId(article_id,-1)
  };

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

  const handleUserChange = (e) => {
    setUserNameInput(e.target.value);
    setDisplayUserNameError(false);
  };

  const handleCommentChange = (e) => {
    setCommentBodyInput(e.target.value);
    setDisplayBodyError(false);
  };

  const submitComment = (e, article_id, userNameInput, commentBodyInput) => {
    e.preventDefault();
    getAllUsers().then(({ users }) => {
      if (
        users.some((user) => {
          return user.username === userNameInput;
        })
      ) {
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
              alert("Enter a valid Username");
            });
        }
      } else {
        setDisplayUserNameError(true);
      }
    });
  };

  if (loadingPage) {
    return (
      <p>
        {" "}
        <img src="https://media.istockphoto.com/id/1357880487/vector/loading.jpg?s=612x612&w=0&k=20&c=Xxl6jRy0tonD3CQ-dsIwModxouaKGIr4obAF2Za1DgI="></img>
      </p>
    );
  }

  if (loadingComments) {
    return (
      <p>
        {" "}
        <img src="https://media.istockphoto.com/id/1357880487/vector/loading.jpg?s=612x612&w=0&k=20&c=Xxl6jRy0tonD3CQ-dsIwModxouaKGIr4obAF2Za1DgI="></img>
      </p>
    );
  }

  return (
    <>
      <div className="single-article-card">
        <h1 className="single-article-title">{articlePage.title}</h1>
        <img
          src={articlePage.article_img_url}
          className="single-article-image"
        ></img>

        <p className="single-article-topic">Topic: {articlePage.topic}</p>

        <p className="single-article-body">{articlePage.body}</p>
        <p className="single-article-author">Author: {articlePage.author}</p>
        <p className="single-article-body">
          Date Created: {articlePage.created_at.split("T")[0]}
        </p>
        <div className="arrow-container">
          Vote on Article:
          <button onClick={() => upvoteArticle()}>
            <img src={UpArrow} className="arrow-image"></img>
          </button>
          <button onClick={() => downvoteArticle()}>
            <img src={DownArrow} className="arrow-image"></img>
          </button>
        </div>
        <p className="single-article-votes">Total Votes: {articleVotes}</p>

        <p className="single-article-comment-count">
          Comment Count: {articlePage.comment_count}
        </p>
        <section className="single-article-comment-body">
          Comments:{" "}
          {comments.map((eachComment) => {
            return (
              <div className="each-comment" key={eachComment.comment_id}>
                <p>Author: {eachComment.author}</p>
                <p>Created_at: {eachComment.created_at.split("T")[0]} </p>

                <p>Votes: {commentVotes[eachComment.comment_id] || 0}</p>

                <p>{eachComment.body}</p>
                <div>
                  Vote on Comment:
                  <button onClick={() => upvoteComment(eachComment.comment_id)}>
                    <img src={UpArrow} className="comment-arrow-image"></img>
                  </button>
                  <button
                    onClick={() => downvoteComment(eachComment.comment_id)}
                  >
                    <img src={DownArrow} className="comment-arrow-image"></img>
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <form
          onSubmit={(e) => {
            submitComment(e, article_id, userNameInput, commentBodyInput);
          }}
        >
          <h1>Add a Comment: </h1>
          <label>UserName:</label>
          <input
            type="text"
            value={userNameInput}
            onChange={(e) => {
              handleUserChange(e);
            }}
          ></input>
          {displayUsernameError ? (
            <p className="error-text">*Enter a valid username*</p>
          ) : (
            <p></p>
          )}
          <section>
            <label>Enter Comment Here: </label>
            <input
              type="text"
              value={commentBodyInput}
              onChange={(e) => {
                handleCommentChange(e);
              }}
            ></input>
            {displayBodyError ? (
              <p className="error-text">*Enter a comment*</p>
            ) : (
              <p></p>
            )}
          </section>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </>
  );
};

export default ArticleCard;
