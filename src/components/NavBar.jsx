import { useEffect, useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { getAllArticles } from "../utils";

const NavBar = ({}) => {
  return (
    <>
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
      <section className="navBar">
        <button>Home</button>
        <form>
          <label htmlFor="articles">Articles by Topic:</label>
          <select id="" name="articles">
            <option value="coding">coding</option>
          </select>
        </form>
        <button>Account</button>
      </section>
    </>
  );
};

export default NavBar;
