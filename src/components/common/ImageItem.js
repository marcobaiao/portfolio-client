import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAPIImagesURL } from "../../utils";

function ImageItem({
  image,
  onImgRemove,
  height = "20",
  width = "28",
  className,
  remove = true,
  existingImage = false,
  folder,
}) {
  if (image)
    return (
      <div
        className={`h-${height} w-${width} relative border border-1 border-gray-300 rounded-md ${className}`}
      >
        <img
          src={
            existingImage
              ? `${getAPIImagesURL()}/${folder}/${image}`
              : URL.createObjectURL(image)
          }
          alt="me"
          className={`w-full h-full rounded-sm object-cover`}
        />
        {remove && (
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-0 right-0 p-2 text-2xl cursor-pointer"
            onClick={() => onImgRemove(image)}
          />
        )}
      </div>
    );
}

export default ImageItem;
