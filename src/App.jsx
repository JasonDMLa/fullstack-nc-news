import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { getAllArticles } from "./utils";
import ArticleContainer from "./components/ArticleContainer";
import NavBar from "./components/NavBar";
import ArticleCard from "./components/ArticleCard";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<ArticleContainer />} />
        <Route path="/article/:article_id" element={<ArticleCard/>} />
      </Routes>
      {/* <ArticleContainer></ArticleContainer> */}
    </>
  );
}

export default App;
