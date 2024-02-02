import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import Button from "../../common/Button";
import PostsList from "./PostsList";
import { fetchPosts } from "../../../services/postsService";
import Spinner from "../../common/Spinner";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching posts
  useEffect(function () {
    fetchPosts(1, 4).then((res) => {
      if (res.status === "success") {
        setPosts(res.data.posts);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <section className="section-content">
      <SectionTitle title="Blog" marginBottom="5" />

      <Link to="/blog" className="mb-10">
        <Button className="2xl:px-8 2xl:py-2 2xl:text-lg">View all</Button>
      </Link>

      <PostsList posts={posts} />
    </section>
  );
}

export default Posts;
