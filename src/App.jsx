import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleContainer from "./components/ArticleContainer";
import NavBar from "./components/NavBar";
import ArticleCard from "./components/ArticleCard";
import AccountLogin from "./components/AccountLogin";
import { UserContext } from "./contexts/UserContexts";
import { useState, useContext } from "react";
import AccountProfile from "./components/AccountProfile";


function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleContainer />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/profile/:name" element={<AccountProfile />} />
      </Routes>
    </>
  );
}

export default App;
