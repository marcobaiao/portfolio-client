import PostCategoryItem from "./PostCategoryItem";

function PostCategoriesList({ categories, onEditIcon, onDeleteIcon }) {
  return (
    <div className="mt-5">
      {categories.map((category) => (
        <PostCategoryItem
          key={category._id}
          category={category}
          onEditIcon={onEditIcon}
          onDeleteIcon={onDeleteIcon}
        />
      ))}
    </div>
  );
}

export default PostCategoriesList;
