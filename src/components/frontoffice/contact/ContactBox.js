import gmail from "../../../assets/images/social/gmail.webp";
import linkedin from "../../../assets/images/social/linkedin.webp";

function ContactBox() {
  const email = "marcobaiaosilva@gmail.com";

  return (
    <section className="mt-10 bg-white p-3 rounded-md">
      <div>
        <a href={`mailto:${email}`} title="Send email">
          <div className="flex my-3 items-center">
            <div className="w-12 flex justify-center">
              <img src={gmail} alt="Gmail" className="w-8 mr-3" />
            </div>

            <p className="text-lg mr-3">{email}</p>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/marco-bai%C3%A3o-728b731b5/"
          target="__blank"
          title="Open LinkedIn profile"
        >
          <div className="flex my-3 items-center">
            <div className="w-12 flex justify-center">
              <img src={linkedin} alt="LinkedIn" className="w-8 mr-3" />
            </div>

            <p className="text-lg">LinkedIn</p>
          </div>
        </a>
      </div>
    </section>
  );
}

export default ContactBox;
