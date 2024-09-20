import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../assets/loadingAnimation.json";
import TopicsContainer from "./TopicsContainer";
import SortingContainer from "./SortingContainer";

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
    return (
      <div>
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );
  }

  return (
    <article>
      <TopicsContainer />
      <SortingContainer setAllArticles={setAllArticles}/>
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
