import { useState } from "react";
import useUserMedia from "../hooks/useUserMedia";
import ZoomControls from "./Zoom";
import AspectRatioSelector from "./AspectRatio";
import { RiCameraLensFill } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";
import { FaFolder } from "react-icons/fa";
import { Gallery } from "./Gallery";

const Camera = () => {
  const {
    videoRef,
    capture,
    capturedImgSrc,
    errorMessage,
    flipCamera,
    setCapturedImgSrc,
  } = useUserMedia();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ASPECT_RATIOS = ["16:9", "4:3", "1:1"];

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  console.log("aspectRatio", aspectRatio)

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const handleDeleteImage = (index) => {
    setCapturedImgSrc((prevCapturedImgSrc) =>
      prevCapturedImgSrc.filter((_, i) => i !== index)
    );
  };

  const videoStyle = {
    transform: `scale(${zoomLevel})`,
    width: `${aspectRatio.split(":")[0]}00px`,
    // height: `${aspectRatio.split(":")[1]}00px`,
  };
console.log("aspectRatio",aspectRatio)
  return (
    <div>
    <div
      style={{
        width: `calc(${parseInt(aspectRatio.split(":")[0])}00px + 20px)`,
        // height: `calc(${parseInt(aspectRatio.split(":")[1])}00px)`,
        maxWidth: "100%",
      }}
    >
      <div
        className={`aspect-ratio-${aspectRatio}`}
        style={{ position: "absolute"}}
      >
        <div  style={{ overflow: "hidden" }}>

       
        <video
          ref={videoRef}
          autoPlay
          playsInline
          // width={600}
          // height={600}
          style={videoStyle}
        ></video>
         </div>
        <div>
          <div
            className="flex justify-around items-center"
            style={{ border: "1px solid gray", background: "#b3cbf2" ,}}
          >
            <div>
              <FaFolder
                onClick={() => setIsModalOpen(true)}
                style={{  color: "blue" ,cursor: "pointer", fontSize: aspectRatio === "1:1" ? "20px" : "30px"
              }}
              />
            </div>
            <div>
              <RiCameraLensFill
                onClick={capture}
                disabled={!!errorMessage}
                style={{ color: "red", cursor: "pointer", fontSize: aspectRatio === "1:1" ? "20px" : "30px" }}
              />
            </div>
            <div>
              <LuRefreshCw
              
                style={{ color: "blue", cursor: "pointer", fontSize: aspectRatio === "1:1" ? "20px" : "30px" }}
                onClick={flipCamera}
                disabled={!!errorMessage}
              />
            </div>
          </div>
          <Gallery
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            images={capturedImgSrc}
            onDelete={handleDeleteImage}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
        }}
      >
        <div>
          <AspectRatioSelector
            aspectRatios={ASPECT_RATIOS}
            selectedAspectRatio={aspectRatio}
            handleAspectRatioChange={handleAspectRatioChange}
            errorMessage={errorMessage}
            aspectRatio={aspectRatio}
          />
        </div>
        <div>
          <ZoomControls
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            errorMessage={errorMessage}
            aspectRatio={aspectRatio}
          />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
    </div>
  );
};

export default Camera;
