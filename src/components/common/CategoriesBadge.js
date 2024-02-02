function CategoriesBadge({ name, size = "sm" }) {
  return (
    <div
      className={`px-3 bg-blue-600 w-fit rounded-md text-${size} text-white py-0.5`}
    >
      {name}
    </div>
  );
}

export default CategoriesBadge;
