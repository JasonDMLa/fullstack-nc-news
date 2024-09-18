import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId, patchVotesByArticleId } from "../utils";
import ShowComments from "./ShowComments";
import PostComment from "./PostComment";
import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [commentVotes, setCommentVotes] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setLoadingPage(false);
        setArticlePage(article[0]);
        setArticleVotes(article[0].votes);
      })
      .then(() => getCommentsByArticleId(article_id))
      .then(({ comments }) => {
        setLoadingComments(false);
        setComments(comments);
        const initialCommentVotes = {};
        comments.forEach((comment) => {
          initialCommentVotes[comment.comment_id] = comment.votes;
        });
        setCommentVotes(initialCommentVotes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const upvoteArticle = () => {
    setArticleVotes((prevVotes) => prevVotes + 1);
    patchVotesByArticleId(article_id, 1);
  };

  const downvoteArticle = () => {
    setArticleVotes((prevVotes) => prevVotes - 1);
    patchVotesByArticleId(article_id, -1);
  };

  if (loadingPage) {
    return (
      <p>
        LOADING PAGE...
        {" "}
        <img src="https://media.istockphoto.com/id/1357880487/vector/loading.jpg?s=612x612&w=0&k=20&c=Xxl6jRy0tonD3CQ-dsIwModxouaKGIr4obAF2Za1DgI="></img>
      </p>
    );
  }

  if (loadingComments) {
    return (
      <p>
        LOADING COMMENTS...
        {" "}
        <img src="https://media.istockphoto.com/id/1302436594/video/loading-circle-icon-animation-on-white-background-4k-video-loopable-preloader.jpg?s=640x640&k=20&c=JQzv8UsXNfUnqQSULYW8B858UOM2O5CoXRgG9a0hRFk="></img>
      </p>
    );
  }

  return (
    <div className="single-article-card">
      <h1 className="single-article-title">{articlePage.title}</h1>
      <img
        src={articlePage.article_img_url}
        className="single-article-image"
        alt="Article image"
      />
      <p className="single-article-topic">Topic: {articlePage.topic}</p>
      <p className="single-article-body">{articlePage.body}</p>
      <p className="single-article-author">Author: {articlePage.author}</p>
      <p className="single-article-body">
        Date Created: {articlePage.created_at.split("T")[0]}
      </p>
      <div className="arrow-container">
        Vote on Article:
        <button onClick={upvoteArticle}>
          <img src={UpArrow} alt="Upvote image" className="arrow-image" />
        </button>
        <button onClick={downvoteArticle}>
          <img src={DownArrow} alt="Downvote image" className="arrow-image" />
        </button>
      </div>
      <p className="single-article-votes">Total Votes: {articleVotes}</p>
      <p className="single-article-comment-count">
        Comment Count: {articlePage.comment_count}
      </p>

      <ShowComments
        comments={comments}
        commentVotes={commentVotes}
        setCommentVotes={setCommentVotes}
      />
      <PostComment article_id={article_id} setComments={setComments} />
    </div>
  );
};

export default ArticleCard;
