import html from "../../../assets/images/technologies/html.webp";
import css from "../../../assets/images/technologies/css.webp";
import bootstrap from "../../../assets/images/technologies/bootstrap.webp";
import tailwind from "../../../assets/images/technologies/tailwind.webp";
import javascript from "../../../assets/images/technologies/javascript.webp";
import typescript from "../../../assets/images/technologies/typescript.webp";
import react from "../../../assets/images/technologies/react.webp";
import php from "../../../assets/images/technologies/php.webp";
import laravel from "../../../assets/images/technologies/laravel.svg";
import sqlserver from "../../../assets/images/technologies/sqlserver.webp";
import git from "../../../assets/images/technologies/git.png";
import bitbucket from "../../../assets/images/technologies/bitbucket.webp";
import nodejs from "../../../assets/images/technologies/nodejs.webp";
import mongodb from "../../../assets/images/technologies/mongodb.webp";
import nextjs from "../../../assets/images/technologies/nextjs.webp";
import jest from "../../../assets/images/technologies/jest.webp";
import postman from "../../../assets/images/technologies/postman.webp";
import redux from "../../../assets/images/technologies/redux.webp";
import sass from "../../../assets/images/technologies/sass.webp";
import webpack from "../../../assets/images/technologies/webpack.webp";
import figma from "../../../assets/images/technologies/figma.webp";
import TechnologiesList from "./TechnologiesList";
import SectionTitle from "../SectionTitle";

const solidKnowledgeImages = [
  { src: html, alt: "HTML" },
  { src: css, alt: "CSS" },
  { src: bootstrap, alt: "Bootstrap" },
  { src: tailwind, alt: "Tailwind" },
  { src: sass, alt: "Sass" },
  { src: javascript, alt: "JavaScript" },
  { src: typescript, alt: "TypeScript" },
  { src: react, alt: "React" },
  { src: redux, alt: "Redux" },
  { src: php, alt: "PHP" },
  { src: laravel, alt: "Laravel" },
  { src: nodejs, alt: "Node.js" },
  { src: jest, alt: "Jest" },
  { src: webpack, alt: "Webpack" },
  { src: git, alt: "GIT" },
  { src: bitbucket, alt: "Jira / BitBucket" },
  { src: postman, alt: "Postman" },
];

const exploreFurtherImages = [
  { src: nextjs, alt: "Next.js" },
  { src: sqlserver, alt: "SQL Server" },
  { src: mongodb, alt: "MongoDB" },
  { src: figma, alt: "Figma" },
];

function Technologies() {
  return (
    <section className="section-content">
      <SectionTitle title="Technologies" />

      <div className="flex flex-col items-center">
        <h3 className="font-heading mb-10 text-[2rem] lg:text-[2.3rem] text-center">
          Solid knowledge
        </h3>

        <TechnologiesList images={solidKnowledgeImages} />
      </div>

      <div className="mt-14">
        <h3 className="font-heading mb-10 text-[2rem] lg:text-[2.3rem] text-center">
          Need to explore further
        </h3>

        <TechnologiesList images={exploreFurtherImages} />
      </div>
    </section>
  );
}

export default Technologies;
