import PropTypes from "prop-types";

const AspectRatioSelector = ({
  aspectRatios,
  selectedAspectRatio,
  handleAspectRatioChange,
  errorMessage,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
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
            border: "1px solid blue",
            color: "white",
            width: "50px",
            borderRadius: "2px",
            marginLeft: "6px"
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
