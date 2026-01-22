import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import MapButton from "../components/button/MapButton";
import { Link } from "react-router";
import MapButton2 from "../components/button/Mapbutton2";

function MapPage() {
  return (
    <FullScreenCloudBackground>
      <div className="flex h-1/2 w-full justify-center items-center">
        {/* <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-4xl text-primary font-bold">Map Page</div>
        </div> */}
      </div>
      <div className="flex h-1/2 w-full justify-center items-center overflow-x-scroll">
        <div className="flex justify-center items-center gap-20">
          <Link to="/game">
            <MapButton>1</MapButton>
          </Link>
          <MapButton2>2</MapButton2>
          <MapButton2>3</MapButton2>
        </div>
      </div>
    </FullScreenCloudBackground>
  );
}

export default MapPage;
