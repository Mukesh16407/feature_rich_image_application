import { useState } from "react";
import useUserMedia from "../hooks/useUserMedia";
import ZoomControls from "./Zoom";
import AspectRatioSelector from "./AspectRatio";

const Camera = () => {
  const { videoRef, capture, capturedImgSrc, errorMessage, flipCamera } =
    useUserMedia();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const ASPECT_RATIOS = ["16:9", "4:3", "1:1"];

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const videoStyle = {
    transform: `scale(${zoomLevel})`,
    width: `${aspectRatio.split(":")[0]}00px`,
    height: `${aspectRatio.split(":")[1]}00px`,
  };

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={600}
        height={600}
        style={videoStyle}
      ></video>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="btn-container">
        <button onClick={capture} disabled={!!errorMessage}>
          Capture photo
        </button>
      </div>
      <button onClick={flipCamera} disabled={!!errorMessage}>
        Flip Camera
      </button>
      <ZoomControls
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        errorMessage={errorMessage}
      />
      <AspectRatioSelector
        aspectRatios={ASPECT_RATIOS}
        selectedAspectRatio={aspectRatio}
        handleAspectRatioChange={handleAspectRatioChange}
        errorMessage={errorMessage}
      />
      {capturedImgSrc && (
        <div className="captured-image">
          <h2>Captured Image</h2>
          {capturedImgSrc.map((src, index) => (
            <img key={index} src={src} alt={`captured-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Camera;
