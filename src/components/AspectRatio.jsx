import PropTypes from "prop-types";

const AspectRatioSelector = ({
  aspectRatios,
  selectedAspectRatio,
  handleAspectRatioChange,
  errorMessage,
  aspectRatio
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: aspectRatio === "1:1" ? "2px" : "10px",
        width: "100%",
        
      }}
    >
      {aspectRatios?.map((ratio) => (
        <button
          key={ratio}
          onClick={() => handleAspectRatioChange(ratio)}
          disabled={!!errorMessage}
          className={
            ratio === selectedAspectRatio ? "border border-red-500" : ""
          }
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "2px",
            fontSize: aspectRatio === "1:1" ? "7px" : "16px"
          }}
        >
          {ratio}
        </button>
      ))}
    </div>
  );
};

AspectRatioSelector.propTypes = {
  aspectRatios: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedAspectRatio: PropTypes.string.isRequired,
  handleAspectRatioChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default AspectRatioSelector;
