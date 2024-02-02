import DeleteIcon from "../../common/icons/DeleteIcon";
import EditIcon from "../../common/icons/EditIcon";

function ProjectCategoryItem({ category, onEditIconClick, onDeleteIconClick }) {
  return (
    <div key={category._id} className="flex items-center mb-2">
      <article className="bg-gray-200 min-w-24 text-center px-3 py-1 border border-1 border-gray-500 rounded-md mr-3">
        {category.name}
      </article>

      <EditIcon onClick={onEditIconClick} />
      <DeleteIcon onClick={onDeleteIconClick} />
    </div>
  );
}

export default ProjectCategoryItem;
