import AdminPostItem from "./AdminPostItem";

function AdminPostsList({ posts, onActiveChange, onDeleteIconClick }) {
  return (
    <div className="mt-7 grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:lg:grid-cols-3">
      {posts.map((post) => (
        <AdminPostItem
          key={post._id}
          post={post}
          onActiveChange={() => onActiveChange(post._id, post.active)}
          onDeleteIconClick={() => onDeleteIconClick(post)}
        />
      ))}
    </div>
  );
}

export default AdminPostsList;
