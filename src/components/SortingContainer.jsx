import { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { getArticlesBySearch } from "../utils";
import ErrorComponent from "./ErrorHandler";

const sortByTerms = [
  "article_id",
  "title",
  "topic",
  "author",
  "body",
  "created_at",
  "votes",
];

const SortingContainer = ({ setAllArticles, setArticles }) => {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");
  const [error, setError] = useState(null);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortClick = () => {
    setSearchParams({ sort_by: sortBy, order: order });
    if (topic) {
      getArticlesBySearch(sortBy, order, topic)
        .then(({ articles }) => {
          setArticles(articles);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    } else {
      getArticlesBySearch(sortBy, order).then(({ articles }) => {
        setAllArticles(articles).catch((err) => {
          setError(err);
        });
      });
    }
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } 

  return (
    <>
      <h2>Sort Articles: </h2>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sortBy} onChange={handleSortChange}>
        {sortByTerms.map((term) => (
          <option key={term} value={term}>
            {term.replace("_", " ")}
          </option>
        ))}
      </select>
      <label htmlFor="order">Order:</label>
      <select id="order" value={order} onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <button onClick={handleSortClick}>Apply</button>
    </>
  );
};

export default SortingContainer;
