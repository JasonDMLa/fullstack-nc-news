import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { getAllArticles } from "../utils";

const ArticleContainer = ({}) => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    getAllArticles()
      .then(({ articles }) => {
        console.log(articles);
        setAllArticles(articles);
        setLoading(false)
      })
      .catch((error) => {
        console.log("error");
        setLoading(false)
      });
  }, []);

  if (loading){
    return <p> <img src="https://media.istockphoto.com/id/1357880487/vector/loading.jpg?s=612x612&w=0&k=20&c=Xxl6jRy0tonD3CQ-dsIwModxouaKGIr4obAF2Za1DgI="></img></p>
  }


  return (
    <>
      <h1>Articles:</h1>
      <div className="article-container">
        {allArticles.map((eachArticle) => {
          return (
            <div className="article-card" key={eachArticle.article_id}>
              <Link to={`/article/${eachArticle.article_id}`}>
                <section className="article-title">{eachArticle.title}</section>
                <img
                  className="article-image"
                  src={eachArticle.article_img_url}
                ></img>
                <section className="article-votes">
                  Votes: {eachArticle.votes}
                </section>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ArticleContainer;
