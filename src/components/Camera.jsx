import useUserMedia from "../hooks/useUserMedia";

const Camera = () => {
  const { videoRef, capture, capturedImgSrc, errorMessage, flipCamera } =
    useUserMedia();

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={600}
        height={600}
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
