import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleContainer from "./components/ArticleContainer";
import NavBar from "./components/NavBar";
import ArticleCard from "./components/ArticleCard";
import AccountLogin from "./components/AccountLogin";
import AccountProfile from "./components/AccountProfile";
import ArticlesByTopics from "./components/ArticlesByTopic";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleContainer />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/profile/:name" element={<AccountProfile />} />
        <Route path="/articles/topics/:topic" element={<ArticlesByTopics />} />
      </Routes>
    </>
  );
}

export default App;
