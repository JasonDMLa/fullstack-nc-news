import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils";
import TopicsContainer from "./TopicsContainer";
import SortingContainer from "./SortingContainer";
import LoadingHandler from "./LoadingHandler";

const ArticleContainer = () => {
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
    return <LoadingHandler/>
  }

  return (
    <article>
      <div className="sorting-container">
      <TopicsContainer />
      <SortingContainer setAllArticles={setAllArticles}/>
      </div>
      <h1>Showing All Articles:</h1>
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
                <p className="article-votes">Votes: {eachArticle.votes}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ArticleContainer;
