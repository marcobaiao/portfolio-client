import { Link } from "react-router-dom";
import { getAPIImagesURL } from "../../../utils";

function ProjectItem({ project }) {
  return (
    <Link to={`/projects/${project._id}`} replace>
      <article
        key={project._id}
        className="h-[26rem] w-80 md:h-80 md:w-60 lg:h-96 lg:w-72 2xl:h-[25rem] 2xl:w-[19rem] 3xl:h-[27rem] 3xl:w-[21rem] shadow-xl rounded-lg group relative"
      >
        <img
          src={`${getAPIImagesURL()}/projects/${project.thumbnailImg}`}
          alt="Project 1"
          className="h-full w-full object-cover rounded-lg"
        />

        <div className="hidden group-hover:flex flex-col justify-center absolute bottom-0 min-h-20 w-full bg-gray-800 rounded-b-lg px-3 py-4">
          <p className="text-white text-lg font-semibold">{project.name}</p>

          <div className="mt-2 flex flex-wrap gap-1">
            {project.categories.map((category) => (
              <div
                key={category.name}
                className="px-3 bg-blue-500 w-fit rounded-md text-sm text-white py-1 font-semibold"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProjectItem;
