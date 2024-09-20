import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../utils";
import { UserContext } from "../contexts/UserContexts";
import ErrorComponent from "./ErrorHandler";

const AccountLogin = () => {
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [correctUser, setCorrectUser] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setAllUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setDisplayText(false);
    setCorrectUser(false);
  };

  const checkUserExists = () => {
    const foundUser = allUsers.find((user) => user.username === input);
    if (foundUser) {
      setCorrectUser(true);
      setLoggedInUser(foundUser);
      navigate(`/profile/${input}`);
    } else {
      setCorrectUser(false);
      setDisplayText(true);
    }
  };

  const submitClicker = (e) => {
    e.preventDefault();
    checkUserExists();
  };


  return (
    <>
      <form onSubmit={submitClicker}>
        <h1>Login Page</h1>
        <label>Username:</label>
        <input type="text" value={input} onChange={handleInputChange}></input>

        <button type="submit">Login</button>

        {displayText && !correctUser && (
          <p>Enter a Valid User (check your capitals)</p>
        )}
      </form>

      <Link to={`/create`}>
      *Currently Unavailable*
        <button>CLICK TO CREATE ACCOUNT</button>
      </Link>
    </>
  );
};

export default AccountLogin;
