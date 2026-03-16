import { Link } from "react-router";
import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import BorderedButton from "../components/button/BorderedButton";
import FractopiaLogo from "/Fractopia.png";

function Home() {
  return (
    <FullScreenCloudBackground>
      <div className="flex h-full w-full justify-center items-center touch-none">
        <div className="flex flex-col justify-center items-center gap-8">
          <img src={FractopiaLogo} alt="Fractopia Logo" className="w-lg" />
          <Link to="/login">
            <BorderedButton>เล่น!</BorderedButton>
          </Link>
        </div>
      </div>
    </FullScreenCloudBackground>
  );
}

export default Home;
  