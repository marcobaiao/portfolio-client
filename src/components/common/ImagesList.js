import ImageItem from "./ImageItem";

function ImagesList({ images, onImgRemove, existingImage, folder }) {
  if (images && images.length > 0)
    return (
      <div className="flex flex-wrap gap-2">
        {images.map((image) => (
          <ImageItem
            image={image}
            onImgRemove={onImgRemove}
            existingImage={existingImage}
            folder={folder}
          />
        ))}
      </div>
    );
}

export default ImagesList;
