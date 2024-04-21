import React from "react";

const ZoomControls = ({ handleZoomIn, handleZoomOut, errorMessage }) => {
  return (
    <div className="zoom-controls">
      <button onClick={handleZoomIn} disabled={!!errorMessage}>
        Zoom In
      </button>
      <button onClick={handleZoomOut} disabled={!!errorMessage}>
        Zoom Out
      </button>
    </div>
  );
};

export default ZoomControls;
