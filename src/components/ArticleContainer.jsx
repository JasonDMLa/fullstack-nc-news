import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils";

const ArticleContainer = ({}) => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles()
      .then(({ articles }) => {
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p>
        {" "}
        <img src="https://media.istockphoto.com/id/1357880487/vector/loading.jpg?s=612x612&w=0&k=20&c=Xxl6jRy0tonD3CQ-dsIwModxouaKGIr4obAF2Za1DgI="></img>
      </p>
    );
  }

  return (
    <article>
      <h1>Articles:</h1>
      <div className="article-container">
        {allArticles.map((eachArticle) => {
          return (
            <div className="article-card" key={eachArticle.article_id}>
              <Link to={`/articles/${eachArticle.article_id}`}>
                <h2 className="article-title">{eachArticle.title}</h2>
                <img
                  className="article-image"
                  src={eachArticle.article_img_url}
                ></img>
                <p className="article-votes">
                  Votes: {eachArticle.votes}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ArticleContainer;
