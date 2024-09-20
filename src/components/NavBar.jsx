import { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContexts";
import { Player } from "@lottiefiles/react-lottie-player";
import globeAnimation from "../assets/globeAnimation.json"

const NavBar = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <nav>
      <p>
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
      <Player
          autoplay
          loop
          src={globeAnimation}
          style={{ height: "300px", width: "300px" }}
          className="globe"
        />
      </p>
      <section className="navBar">
        <Link to="/">
          <button>Home</button>
        </Link>
        {loggedInUser ? (
        <span className="logged-user">Logged in as: {loggedInUser.username}</span>
      ) : (
        <Link to="/login">
          <button>Login</button>
          </Link>
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
