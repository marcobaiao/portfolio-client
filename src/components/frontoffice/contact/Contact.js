import SectionTitle from "../SectionTitle";
import ContactBox from "./ContactBox";

function Contact(e) {
  return (
    <section
      style={{ clipPath: "polygon(50% 15%, 100% 0, 100% 100%, 0 100%, 0 0)" }}
      className="bg-blue-800 pt-32 pb-16 px-10 flex flex-col items-center md:pt-40 md:pb-24"
    >
      <SectionTitle title="Contact me" color="white" />

      <ContactBox />
    </section>
  );
}

export default Contact;
