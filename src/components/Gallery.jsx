import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
export const Gallery = ({ isOpen, onClose, images, onDelete }) => {
  if (!isOpen) return null;

  const handleDelete = (index) => {
    onDelete(index);
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
      <div className="relative w-full max-w-lg p-2 m-4 bg-white rounded-lg shadow-lg " style={{ height: "200px", display: "flex", alignItems: "center"}}>
        <span
          className="absolute top-0 right-0 m-3 text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {images.length === 0 ? (
          <p className="text-center text-gray-600">Empty folder</p>
        ) : (
          <div className="grid grid-cols-3 gap-2" style={{ margin: "35px"}}>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`captured-${index}`}
                  className="w-full h-auto rounded transition-transform duration-300 hover:scale-150"
                />
                <button
                  className="absolute top-0 right-0  p-1 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};
