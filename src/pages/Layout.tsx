import { Outlet } from "react-router";
import { useState, useEffect } from "react";

function Layout() {
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined" && window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-[#FFF1F6] to-[#CFE1F9]">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Please Rotate Your Device
          </h1>
          <p className="text-lg text-gray-600">
            This game is best played in landscape mode
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default Layout;
