import { getAPIImagesURL } from "../../../utils";

function AboutImage() {
  return (
    <div className="bg-transparent rounded-full h-80 w-80 2xl:h-[24rem] 2xl:w-[24rem] 3xl:h-[26rem] 3xl:w-[26rem]">
      <img
        src={`${getAPIImagesURL()}/me.jpeg`}
        alt="me"
        className="h-full w-full rounded-full object-cover"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default AboutImage;
