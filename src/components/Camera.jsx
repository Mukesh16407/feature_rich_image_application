import React, { useState, useRef, useEffect } from "react";
import useUserMedia from "../hooks/useUserMedia";

const Camera = () => {
  const [facingMode, setFacingMode] = useState("environment");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef();

  const { captureImage, error, stream, isInitialized } = useUserMedia(
    { video: { facingMode } },
    isCameraOn
  );

  const handleCaptureImage = async () => {
    try {
      const imageURL = await captureImage();
      setCapturedImage(imageURL);
      setIsCameraOn(false);
      console.log(imageURL, "imageURL");
      // Handle captured image URL
    } catch (err) {
      console.error("Error capturing image:", err);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  };

  const toggleCamera = () => {
    setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="camera-capture">
      {error && <div>Error accessing camera: {error.message}</div>}
      <button onClick={toggleCamera}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>
      {isInitialized && isCameraOn && (
        <>
          <video autoPlay playsInline ref={videoRef} />
          <button onClick={handleCaptureImage}>Capture Image</button>
          <button onClick={toggleFacingMode}>Toggle Camera</button>
        </>
      )}
    </div>
  );
};

export default Camera;
