import { useState, useRef, useEffect } from "react";

const useUserMedia = () => {
  const [stream, setStream] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [capturedImgSrc, setCapturedImgSrc] = useState([]);
  const videoRef = useRef();
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);

  console.log(selectedCameraIndex, "selectedCameraIndex");
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraDevices(videoDevices);
        if (videoDevices.length === 0) {
          setErrorMessage("No cameras found.");
          return;
        }
        if (
          selectedCameraIndex === null ||
          selectedCameraIndex >= videoDevices.length
        ) {
          setSelectedCameraIndex(0);
        }

        const constraints = {
          video: {
            facingMode: selectedCameraIndex === 0 ? "user" : "environment",
          },
        };
        const newStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        setStream(newStream);
        videoRef.current.srcObject = newStream;
        setErrorMessage("");
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setErrorMessage("Error accessing webcam.");
      }
    };

    initializeCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [selectedCameraIndex]);

  const flipCamera = () => {
    if (cameraDevices.length <= 1) {
      setErrorMessage("No other camera found.");
      return;
    }

    setSelectedCameraIndex((selectedCameraIndex + 1) % cameraDevices.length);
  };

  const capture = () => {
    if (!stream) {
      setErrorMessage("Camera not available.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageSrc = canvas.toDataURL("image/jpeg");
    setImgSrc(imageSrc);
    setCapturedImgSrc((prevCapturedImgSrc) => [
      ...prevCapturedImgSrc,
      imageSrc,
    ]);
  };

  return {
    videoRef,
    imgSrc,
    capture,
    capturedImgSrc,
    errorMessage,
    flipCamera,
    setCapturedImgSrc,
  };
};

export default useUserMedia;
