import Typewriter from "../../common/Typewriter";
import linkedin from "../../../assets/images/social/linkedin.webp";
import github from "../../../assets/images/social/github.webp";

function AboutDescription({ description }) {
  return (
    <div className="mt-10 basis-1/2 md:mt-0 md:mx-5 xl:mx-10">
      <p className="text-center text-2xl md:text-3xl lg:text-4xl 2xl:text-[2.5rem] 3xl:text-[2.75rem] xl:leading-tight">
        <Typewriter text={description} />
      </p>

      <div className="mt-10 w-full flex justify-center gap-2 fade-in-image">
        <a
          href="https://www.linkedin.com/in/marco-silva-728b731b5/"
          target="__blank"
          title="Check my Linkedin"
        >
          <img src={linkedin} alt="Gihub" className="h-10" />
        </a>
        <a
          href="https://github.com/marcobaiao"
          target="__blank"
          title="Check my Github"
        >
          <img src={github} alt="Gihub" className="h-10" />
        </a>
      </div>
    </div>
  );
}

export default AboutDescription;
