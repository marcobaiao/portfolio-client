import About from "../../components/frontoffice/about/About";
import Technologies from "../../components/frontoffice/technologies/Technologies";
import Projects from "../../components/frontoffice/projects/Projects";
//import Posts from "../../components/frontoffice/blog/Posts";
import Contact from "../../components/frontoffice/contact/Contact";
import Footer from "../../components/frontoffice/Footer";

function Homepage() {
  return (
    <>
      <About />
      <Technologies />
      <Projects />
      {/*<Posts />*/}
      <Contact />
      <Footer />
    </>
  );
}

export default Homepage;
