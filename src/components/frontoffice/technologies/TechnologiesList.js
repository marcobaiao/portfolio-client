function TechnologiesList({ images }) {
  return (
    <ul className="flex flex-wrap justify-center items-center gap-8">
      {images.map((image) => (
        <li key={image.src}>
          <img
            src={image.src}
            alt={image.alt}
            title={image.alt}
            className="w-10 lg:w-12"
          />
        </li>
      ))}
    </ul>
  );
}

export default TechnologiesList;
