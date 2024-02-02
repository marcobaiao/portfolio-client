import ProjectCategoryItem from "./ProjectCategoryItem";

function ProjectCategoriesList({
  categories,
  onEditIconClick,
  onDeleteIconClick,
}) {
  return (
    <div className="mt-5">
      {categories.map((category) => (
        <ProjectCategoryItem
          key={category.name}
          category={category}
          onEditIconClick={() => onEditIconClick(category)}
          onDeleteIconClick={() => onDeleteIconClick(category)}
        />
      ))}
    </div>
  );
}

export default ProjectCategoriesList;
