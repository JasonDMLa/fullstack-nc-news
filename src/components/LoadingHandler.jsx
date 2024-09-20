import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../assets/loadingAnimation.json";

const LoadingHandler = ({ message }) => {
    return (
      <div>
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );
  };

  export default LoadingHandler 