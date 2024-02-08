import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../services/postsService";
import CategoriesBadge from "../../components/common/CategoriesBadge";
import parse from "html-react-parser";
import SectionTitle from "../../components/frontoffice/SectionTitle";
import { formatISODate, getAPIImagesURL } from "../../utils";
import Spinner from "../../components/common/Spinner";

function Post() {
  const params = useParams();

  const [post, setPost] = useState(null);

  useEffect(
    function () {
      fetchPost(params.postId).then((res) => {
        if (res.status === "success") {
          setPost(res.data.post);
        }
      });
    },
    [params.postId]
  );

  if (!post) return <Spinner />;

  return (
    <section className="flex flex-col items-center px-10 pt-7 pb-14 sm:max-w-2xl xl:max-w-3xl mx-auto">
      <SectionTitle title={post.title} textAlign="left" marginBottom="5" />

      <p className="text-left w-full text-lg text-gray-700">
        {post.description}
      </p>

      <p className="w-full text-left mt-3 italic text-sm">
        {formatISODate(post.createdAt)}
      </p>

      <div className="flex flex-wrap gap-2 w-full mt-5">
        {post.categories.map((category) => (
          <CategoriesBadge key={category.name} name={category.name} size="md" />
        ))}
      </div>

      <img
        className="mt-10 w-full object-contain rounded-md"
        src={`${getAPIImagesURL()}/posts/${post.thumbnailImg}`}
        alt="teae"
      />

      <div className="mt-5 w-full">{parse(post.content)}</div>
    </section>
  );
}

export default Post;
