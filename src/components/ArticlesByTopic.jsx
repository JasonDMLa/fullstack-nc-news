import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils";
import { useParams, Link } from "react-router-dom";
import TopicsContainer from "./TopicsContainer";
import SortingContainer from "./SortingContainer";
import ErrorComponent from "./ErrorHandler";
import LoadingHandler from "./LoadingHandler";

const ArticlesByTopics = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticlesByTopic(topic)
      .then(({ articles }) => {
        setLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        setError(err);
      });
  }, [topic]);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  if (loading) {
    return <LoadingHandler />;
  }

  return (
    <article>
      <div className="sorting-container">
        <TopicsContainer />
        <SortingContainer setArticles={setArticles} />
      </div>
      <h1>Articles for {topic}:</h1>
      <div className="article-container">
        {articles.map((eachArticle) => {
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

export default ArticlesByTopics;
