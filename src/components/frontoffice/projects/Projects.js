import ProjectsList from "./ProjectsList";
import SectionTitle from "../SectionTitle";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../../services/projectsService";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import Spinner from "../../common/Spinner";

function Projects() {
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching 3 projects
  useEffect(function () {
    fetchProjects(1, 3).then((res) => {
      if (res.status === "success") {
        setProjects(res.data.projects);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <section className="section-content">
      <SectionTitle title="Projects" marginBottom="5" />

      <Link to="/projects" className="mb-10">
        <Button className="2xl:px-8 2xl:py-2 2xl:text-lg">View all</Button>
      </Link>

      <ProjectsList projects={projects} />
    </section>
  );
}

export default Projects;
