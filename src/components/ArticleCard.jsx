import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";
import { getAllArticles, getArticleById } from "../utils";
import { getCommentsByArticleId } from "../utils";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        console.log(article, "<-- each article");
        setArticlePage(article[0]);
      })
      .then(() => {
        return getCommentsByArticleId(article_id);
      })
      .then(({ comments }) => {
        console.log(comments,"<--- comment array");
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          Date Created: {articlePage.created_at}
        </p>
        <p className="single-article-votes">Votes: {articlePage.votes}</p>
        <p className="single-article-comment-count">
          Comment Count: {articlePage.comment_count}
        </p>
        <section className="single-article-comment-body">Comments: {
            comments.map((eachComment)=>{
                return(
                    <div className="each-comment" key={eachComment.comment_id}>
                        <p>Author: {eachComment.author}</p>
                        <p>Created_at: {eachComment.created_at} </p>
                        <p>Votes: {eachComment.votes}</p>
                        <p>{eachComment.body}</p>

                    </div>
                )
            })}</section>
      </div>
    </>
  );
};

export default ArticleCard;
