import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../assets/errorAnimation.json";

const ErrorComponent = ({ message }) => {
    return (
      <div>
        <h1>Error</h1>
        <p>{message}</p>
        <Player
          autoplay
          loop
          src={errorAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );
  };

  export default ErrorComponent 