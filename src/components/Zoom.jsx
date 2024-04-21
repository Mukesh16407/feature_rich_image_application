import PropTypes from "prop-types";
import { BsPlusSquare } from "react-icons/bs";
import { CiSquareMinus } from "react-icons/ci";
const ZoomControls = ({ handleZoomIn, handleZoomOut, errorMessage }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "1",
          marginRight: "14%",
          marginTop: "1%",
        }}
      >
        <BsPlusSquare
          onClick={handleZoomIn}
          disabled={!!errorMessage}
          style={{ fontSize: "45px" }}
        />
        <CiSquareMinus
          onClick={handleZoomOut}
          disabled={!!errorMessage}
          style={{ fontSize: "55px" }}
        />
      </div>
    </>
  );
};

ZoomControls.propTypes = {
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default ZoomControls;
