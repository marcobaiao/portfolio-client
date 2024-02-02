import { useNavigate } from "react-router-dom";
import EyeIcon from "../../common/icons/EyeIcon";
import EditIcon from "../../common/icons/EditIcon";
import DeleteIcon from "../../common/icons/DeleteIcon";

function AdminPostItem({ post, onActiveChange, onDeleteIconClick }) {
  const navigate = useNavigate();

  return (
    <div
      key={post._id}
      className="border border-1 border-gray-400 rounded-md p-3"
    >
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-sm italic">
        {post.categories.map((category) => category.name).join(", ")}
      </p>
      <div className="w-20 h-1 rounded-lg bg-red-300 my-2"></div>
      <p className="text-sm line-clamp-2">{post.description}</p>

      <div className="flex items-center justify-end p-3">
        <button
          onClick={onActiveChange}
          className={`mr-3 ${
            post.active
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }  text-white px-4 rounded-md py-1 font-semibold text-sm`}
        >
          {post.active ? "Desativar" : "Ativar"}
        </button>
        <EyeIcon onClick={() => navigate(`/admin/post/${post._id}`)} />
        <EditIcon onClick={() => navigate(`/admin/post/${post._id}/edit`)} />
        <DeleteIcon onClick={onDeleteIconClick} />
      </div>
    </div>
  );
}

export default AdminPostItem;
