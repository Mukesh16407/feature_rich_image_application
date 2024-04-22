import PropTypes from "prop-types";
import { BsPlusSquare } from "react-icons/bs";
import { CiSquareMinus } from "react-icons/ci";
const ZoomControls = ({ handleZoomIn, handleZoomOut, errorMessage , aspectRatio}) => {
  return (
    <>
      <div style={{ width: "100%", marginTop: "2px", marginRight: "10px",}}>
        <BsPlusSquare
          onClick={handleZoomIn}
          disabled={!!errorMessage}
          style={{ width: "40px",  fontSize: aspectRatio === "1:1" ? "11px" : "30px" }}
        />
        <CiSquareMinus
          onClick={handleZoomOut}
          disabled={!!errorMessage}
          style={{ width: "40px", fontSize: aspectRatio === "1:1" ? "15px" : "40px"  }}
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
