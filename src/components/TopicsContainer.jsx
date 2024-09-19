import { useEffect, useState } from "react";
import { getAllTopics } from "../utils";
import ArticlesByTopic from "./ArticlesByTopic";
import { useNavigate } from "react-router-dom";

const TopicsContainer = () => {
  const [topics, setTopics] = useState([]);
  const [topicToSearch, setTopicToSearch] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  const handleChange = (e) => {
    setTopicToSearch(e.target.value);
  };

  const handleSearchClick = (topicToSearch) => {
    if (topicToSearch) {
      navigate(`/articles/topics/${topicToSearch}`);
    } else {
      setDisplayError(true);
    }
  };
  <ArticlesByTopic topicToSearch={topicToSearch} />;
  return (
    <>
      <h1>Select a topic: </h1>
      <label htmlFor="topics">View Articles by Topic:</label>
      <select id="topics-bar" name="topics" onClick={handleChange}>
        <option></option>
        {topics.map((topic, index) => {
          return <option key={index}>{topic.slug}</option>;
        })}
      </select>
      {!displayError ? (
        <button
          onClick={() => {
            handleSearchClick(topicToSearch);
          }}
        >
          Search for Topic
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              handleSearchClick(topicToSearch);
            }}
          >
            Search for Topic
          </button>
          <p className="error-text">*Select a topic*</p>
        </>
      )}
    </>
  );
};

export default TopicsContainer;
