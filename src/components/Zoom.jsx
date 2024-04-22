import PropTypes from "prop-types";
import { BsPlusSquare } from "react-icons/bs";
import { CiSquareMinus } from "react-icons/ci";
const ZoomControls = ({ handleZoomIn, handleZoomOut, errorMessage }) => {
  return (
    <>
      <div>
        <BsPlusSquare
          onClick={handleZoomIn}
          disabled={!!errorMessage}
          style={{ fontSize: "30px",     width: "40px" }}
        />
        <CiSquareMinus
          onClick={handleZoomOut}
          disabled={!!errorMessage}
          style={{ fontSize: "40px", width: "40px" }}
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
