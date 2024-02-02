import DeleteIcon from "../../common/icons/DeleteIcon";
import EditIcon from "../../common/icons/EditIcon";

function PostCategoryItem({ category, onEditIcon, onDeleteIcon }) {
  return (
    <div key={category._id} className="flex items-center mb-2">
      <article className="bg-gray-200 min-w-24 text-center px-3 py-1 border border-1 border-gray-500 rounded-md mr-3">
        {category.name}
      </article>

      <EditIcon onClick={() => onEditIcon(category)} />
      <DeleteIcon onClick={() => onDeleteIcon(category)} />
    </div>
  );
}

export default PostCategoryItem;
