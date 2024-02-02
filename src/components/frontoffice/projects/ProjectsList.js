import ProjectItem from "./ProjectItem";

function ProjectsList({ projects }) {
  return (
    <>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
          {projects.map((project) => (
            <ProjectItem key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
}

export default ProjectsList;
