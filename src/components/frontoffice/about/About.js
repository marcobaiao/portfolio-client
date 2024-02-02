import { useEffect, useState } from "react";
import AboutDescription from "./AboutDescription";
import AboutImage from "./AboutImage";
import { fetchInformation } from "../../../services/fetchInformation";
import Spinner from "../../common/Spinner";

function About() {
  const [information, setInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching about info - image and description
  useEffect(function () {
    fetchInformation().then((res) => {
      if (res.status === "success") {
        setInformation(res.data.information);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <section className="section-content md:flex-row md:justify-center lg:pt-20 lg:pb-12 xl:px-28 2xl:px-48 2xl:pt-16 2xl:pb-10 3xl:px-60">
      <AboutImage />

      <AboutDescription description={information.description} />
    </section>
  );
}

export default About;
