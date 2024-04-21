/* eslint-disable react/prop-types */

const AspectRatioSelector = ({
  aspectRatios,
  selectedAspectRatio,
  handleAspectRatioChange,
  errorMessage,
}) => {
  return (
    <div className="aspect-ratio-selector">
      {aspectRatios?.map((ratio) => (
        <button
          key={ratio}
          onClick={() => handleAspectRatioChange(ratio)}
          disabled={!!errorMessage}
          className={ratio === selectedAspectRatio ? "active" : ""}
        >
          {ratio}
        </button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
