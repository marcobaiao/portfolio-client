import PostItem from "./PostItem";

function PostsList({ posts }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
}

export default PostsList;
