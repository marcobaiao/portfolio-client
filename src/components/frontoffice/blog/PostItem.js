import { useNavigate } from "react-router-dom";
import { formatISODate, getAPIImagesURL } from "../../../utils";
import CategoriesBadge from "../../common/CategoriesBadge";

function PostItem({ post }) {
  const navigate = useNavigate();

  return (
    <article
      key={post._id}
      className="shadow-lg p-3 lg:w-[400px] xl:w-[500px] cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div>
        <img
          src={`${getAPIImagesURL()}/posts/${post.thumbnailImg}`}
          alt="Blog 1"
          className="h-20 w-28 rounded-md object-cover float-right ml-5 mb-5"
        />
        <div className="mr-2">
          <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
          <p className="text-sm italic mt-1">{formatISODate(post.createdAt)}</p>
          <div className="w-20 h-1 rounded-lg bg-red-300 my-2"></div>
          <p className="text font-light line-clamp-2">{post.description}</p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {post.categories.map((category) => (
          <CategoriesBadge key={category.name} name={category.name} size="md" />
        ))}
      </div>
    </article>
  );
}

export default PostItem;
