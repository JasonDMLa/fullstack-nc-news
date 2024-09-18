import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
      <section className="navBar">
        <Link to="/">
          <button>Home</button>
        </Link>
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
