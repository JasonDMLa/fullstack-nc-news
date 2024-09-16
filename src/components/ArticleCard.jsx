import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";
import { getAllArticles, getArticleById } from "../utils";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState({});
  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        console.log(article, "<-- each article");
        setArticlePage(article[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="single-article-card">
      <h1 className="single-article-title">{articlePage.title}</h1>
      <img src={articlePage.article_img_url} className="single-article-image"></img>
      <p className="single-article-topic">Topic: {articlePage.topic}</p>
      <p className="single-article-body">{articlePage.body}</p>
      <p className="single-article-author">Author: {articlePage.author}</p>
      <p className="single-article-body">Date Created: {articlePage.created_at}</p>
      <p className="single-article-votes">Votes: {articlePage.votes}</p>
      <p className="single-article-comment-count">Comment Count: {articlePage.comment_count}</p>
      <p className="single-article-comment-body">Comments: *COMMENTS DISPLAYED HERE*</p>
    </div>
  );
};

export default ArticleCard;
