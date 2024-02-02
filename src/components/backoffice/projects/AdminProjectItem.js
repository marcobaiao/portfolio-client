import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../common/icons/DeleteIcon";
import EditIcon from "../../common/icons/EditIcon";
import EyeIcon from "../../common/icons/EyeIcon";

function AdminProjectItem({ project, onActiveChange, onDeleteIconClick }) {
  const navigate = useNavigate();

  return (
    <div
      key={project._id}
      className="border border-1 border-gray-400 p-3 rounded-md"
    >
      <p className="text-xl font-semibold">{project.name}</p>
      <p className="text-sm italic">
        {project.categories.map((category) => category.name).join(", ")}
      </p>
      <div className="w-20 h-1 rounded-lg bg-red-300 my-2"></div>
      <p className="line-clamp-2">{project.resume}</p>

      <div className="flex items-center justify-end p-3">
        <button
          className={`mr-3 ${
            project.active
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }  text-white px-4 rounded-md py-1 font-semibold text-sm`}
          onClick={onActiveChange}
        >
          {project.active ? "Desativar" : "Ativar"}
        </button>
        <EyeIcon onClick={() => navigate(`/admin/project/${project._id}`)} />
        <EditIcon
          onClick={() => navigate(`/admin/projects/${project._id}/edit`)}
        />
        <DeleteIcon onClick={onDeleteIconClick} />
      </div>
    </div>
  );
}

export default AdminProjectItem;
