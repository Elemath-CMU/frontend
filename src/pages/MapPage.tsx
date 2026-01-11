import FullScreenCloudBackground from "../components/FullScreenCloudBackground";

function MapPage() {
  return (
    <FullScreenCloudBackground>
      <div className="flex h-1/2 w-full justify-center items-center">
        {/* <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-4xl text-primary font-bold">Map Page</div>
        </div> */}
      </div>
      <div className="flex h-1/2 w-full justify-center items-center overflow-x-scroll">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-4xl text-primary font-bold">Map Page</div>
        </div>
      </div>
    </FullScreenCloudBackground>
  );
}

export default MapPage;
