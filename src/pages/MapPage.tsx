import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import MapButtonActive from "../components/button/MapButtonActive";
import { useNavigate } from "react-router";
import MapButtonInactive from "../components/button/MapbuttonInactive";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { gameData } from "./GameData";

function MapPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <FullScreenCloudBackground>
      <div className="flex h-1/2 w-full justify-center items-center touch-none">
      </div>
      <div className="flex h-1/2 w-full justify-center items-center overflow-x-scroll">
        <div className="flex justify-center items-center gap-20">
          {gameData.map((_, index) =>
            index <= (currentUser?.episode || 0) ? (
              <MapButtonActive key={index} onClick={() => navigate('/game', { state: { episodeIndex: index } })}>
                {index + 1}
              </MapButtonActive>
            ) : (
              <MapButtonInactive key={index}>
                {index + 1}
              </MapButtonInactive>
            )
          )}
        </div>
      </div>
    </FullScreenCloudBackground>
  );
}

export default MapPage;
