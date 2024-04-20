import { useState, useEffect } from "react";

function useUserMedia(constraints = { video: true }, startAutomatically) {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        if (!didCancel) {
          setStream(mediaStream);
          setIsInitialized(true);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err);
        }
      }
    };

    if (startAutomatically) {
      getUserMedia();
    }

    return () => {
      didCancel = true;
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        // Additionally, consider releasing any event listeners or timers here
      }
    };
  }, [constraints, startAutomatically]);

  const captureImage = async () => {
    if (!stream) {
      throw new Error("No media stream available");
    }

    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    const blob = await imageCapture.takePhoto();
    return URL.createObjectURL(blob);
  };

  return {
    captureImage,
    error,
    stream,
    isInitialized,
  };
}

export default useUserMedia;
