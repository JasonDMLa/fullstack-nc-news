import { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContexts";

const NavBar = () => {
  const { loggedInUser } = useContext(UserContext);
  useEffect(() => {});

  return (
    <nav>
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
      <section className="navBar">
        <Link to="/">
          <button>Home</button>
        </Link>
        {loggedInUser ? (
        <span>Logged in as: {loggedInUser.username}</span>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {loggedInUser && (
        <Link to={`/profile/${loggedInUser.username}`}>
          <button>Profile</button>
        </Link>
      )}
      </section>
    </nav>
  );
};

export default NavBar;
