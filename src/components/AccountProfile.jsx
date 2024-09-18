import { useContext} from "react";
import { UserContext } from "../contexts/UserContexts";
import { Link } from "react-router-dom";

const AccountProfile = () => {
  const { loggedInUser} = useContext(UserContext);
  return (
    <>
      <div>
        <Link to="/login">
        <button>SWITCH ACCOUNT</button>
        </Link>
        <h1>Profile of {loggedInUser.name}</h1>
        
        {loggedInUser.avatar_url && (
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username}'s avatar`}
          />
        )}
        <p>Username: {loggedInUser.username}</p>
      </div>
    </>
  );
};

export default AccountProfile;
