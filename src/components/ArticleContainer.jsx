import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { getAllArticles } from "../utils";

const ArticleContainer = ({}) => {
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
      getAllArticles()
        .then(({ articles }) => {
          console.log(articles);
          setAllArticles(articles);
        })
        .catch((error) => {
          console.log("error");
        });
    }, []);
  
    return (
      <>
        <h1>Articles:</h1>
        <div className="article-container">
          {allArticles.map((eachArticle)=>{
            return (
              <div
              className="article-card"
              key={eachArticle.article_id}>
             
                <section className="article-title">{eachArticle.title}</section>
                <img className="article-image" src={eachArticle.article_img_url}></img>
                <section className="article-votes">Votes: {eachArticle.votes}</section>
             
              </div>
            )
          })}
        </div>
      </>
    );
}

export default ArticleContainer