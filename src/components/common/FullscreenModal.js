import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAPIImagesURL } from "../../utils";

function FullscreenModal({
  image,
  onClose,
  miniatures,
  onNext,
  onPrevious,
  onMiniatureClick,
}) {
  return (
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-90 overflow-y-auto h-full w-full px-4 flex flex-col items-center justify-center select-none">
      <FontAwesomeIcon
        icon={faTimes}
        className="text-white text-4xl absolute top-8 right-8 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative flex justify-between items-center text-xl mb-5 font-semibold h-80 w-full sm:w-11/12 md:w-9/12 lg:w-8/12 lg:h-96 xl:h-[26rem] 2xl:h-[32rem] 3xl:h-[36rem]">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="absolute -left-1 xl:-left-16 text-5xl text-gray-400 cursor-pointer"
          onClick={onPrevious}
        />
        <img
          src={image}
          className="w-full h-full object-contain rounded-md"
          alt="Img"
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className="absolute text-5xl text-gray-400 -right-1 xl:-right-16 cursor-pointer"
          onClick={onNext}
        />
      </div>
      <div className="relative flex items-center gap-2 overflow-auto w-fit max-w-full lg:max-w-2xl">
        {miniatures.map((miniatureImg, index) => (
          <img
            src={`${getAPIImagesURL()}/projects/${miniatureImg}`}
            className={`h-24 object-contain cursor-pointer rounded-md`}
            alt="Img"
            onClick={() => onMiniatureClick(miniatureImg, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default FullscreenModal;
