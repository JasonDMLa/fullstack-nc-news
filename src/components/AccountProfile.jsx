import { useContext} from "react";
import { UserContext } from "../contexts/UserContexts";
import { Link } from "react-router-dom";

const AccountProfile = () => {
  const { loggedInUser} = useContext(UserContext);
  return (
    <>
      <div className="profile-container">
        <Link to="/login">
        <button>SWITCH ACCOUNT</button>
        </Link>
        <h1>Profile of {loggedInUser.name}</h1>
         <p>Username: {loggedInUser.username}</p>
        {loggedInUser.avatar_url && (
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username}'s avatar`}
          />
        )}
       
      </div>
    </>
  );
};

export default AccountProfile;
