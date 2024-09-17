import { Route, Routes} from "react-router-dom";
import "./App.css";
import ArticleContainer from "./components/ArticleContainer";
import NavBar from "./components/NavBar";
import ArticleCard from "./components/ArticleCard";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<ArticleContainer />} />
        <Route path="/articles/:article_id" element={<ArticleCard/>} />
      </Routes>
    </>
  );
}

export default App;
