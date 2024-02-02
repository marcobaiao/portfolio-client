import AdminProjectItem from "./AdminProjectItem";

function AdminProjectsList({ projects, onDeleteIconClick, onActiveChange }) {
  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <AdminProjectItem
          key={project._id}
          project={project}
          onActiveChange={() =>
            onActiveChange(project._id, project.name, project.active)
          }
          onDeleteIconClick={() => onDeleteIconClick(project)}
        />
      ))}
    </div>
  );
}

export default AdminProjectsList;
