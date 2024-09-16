import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { getAllArticles } from "./utils";
import ArticleContainer from "./components/ArticleContainer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<ArticleContainer />} />
        
      </Routes>
      {/* <ArticleContainer></ArticleContainer> */}
    </>
  );
}

export default App;
