import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProject } from "../../services/projectsService";
import parse from "html-react-parser";
import CategoriesBadge from "../../components/common/CategoriesBadge";
import FullscreenModal from "../../components/common/FullscreenModal";
import SectionTitle from "../../components/frontoffice/SectionTitle";
import Spinner from "../../components/common/Spinner";
import { getAPIImagesURL } from "../../utils";

function Project() {
  const params = useParams();

  const [project, setProject] = useState(null);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImagesMiniatures, setFullscreenImagesMiniatures] =
    useState(null);

  function handlePreviousFullscreenImage() {
    const currentImgIndex = fullscreenImagesMiniatures.findIndex(
      (img) => img === fullscreenImage
    );

    if (currentImgIndex === 0)
      setFullscreenImage(
        fullscreenImagesMiniatures[fullscreenImagesMiniatures.length - 1]
      );
    else setFullscreenImage(fullscreenImagesMiniatures[currentImgIndex - 1]);
  }

  function handleNextFullscreenImage() {
    const currentImgIndex = fullscreenImagesMiniatures.findIndex(
      (img) => img === fullscreenImage
    );

    if (currentImgIndex === fullscreenImagesMiniatures.length - 1)
      setFullscreenImage(fullscreenImagesMiniatures[0]);
    else setFullscreenImage(fullscreenImagesMiniatures[currentImgIndex + 1]);
  }

  useEffect(
    function () {
      fetchProject(params.projectId).then((res) => {
        if (res.status === "success") {
          setProject(res.data.project);
        }
      });
    },
    [params.projectId]
  );

  if (!project) return <Spinner />;

  return (
    <section className="flex flex-col items-center px-10 pt-7 pb-14 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
      <SectionTitle title={project.name} marginBottom="5" />

      <div className="mb-8 w-full flex flex-wrap justify-center gap-1">
        {project.categories
          .map((category) => category.name)
          .map((category) => (
            <CategoriesBadge key={category} name={category} size="md" />
          ))}
      </div>

      <p className="w-full text-lg text-gray-700 italic text-justify mb-10">
        {project.resume}
      </p>

      <img
        src={`${getAPIImagesURL()}/projects/${project.thumbnailImg}`}
        alt="Project thumbnail"
        className="h-72 w-full object-contain md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] cursor-pointer"
        onClick={() => {
          setIsFullscreenModalOpen(true);
          setFullscreenImage(project.thumbnailImg);
          setFullscreenImagesMiniatures([
            project.thumbnailImg,
            ...project.images,
          ]);
        }}
      />

      <div className="mt-5 flex flex-wrap justify-center gap-2 select-none">
        {project.images.map((image) => (
          <div
            key={image}
            className="h-24 cursor-pointer"
            onClick={() => {
              setIsFullscreenModalOpen(true);
              setFullscreenImage(image);
              setFullscreenImagesMiniatures([
                project.thumbnailImg,
                ...project.images,
              ]);
            }}
          >
            <img
              src={`${getAPIImagesURL()}/projects/${image}`}
              alt="Project 1"
              className="object-contain h-full w-full rounded-md"
            />
          </div>
        ))}
      </div>

      <h2 className="text-center text-xl font-semibold mt-10 lg:text-2xl">
        Description
      </h2>

      <p className="mt-7 w-full text-justify">{parse(project.description)}</p>

      {isFullscreenModalOpen && (
        <FullscreenModal
          image={`${getAPIImagesURL()}/projects/${fullscreenImage}`}
          onClose={() => setIsFullscreenModalOpen(false)}
          miniatures={fullscreenImagesMiniatures}
          onMiniatureClick={(image) => setFullscreenImage(image)}
          onNext={handleNextFullscreenImage}
          onPrevious={handlePreviousFullscreenImage}
        />
      )}
    </section>
  );
}

export default Project;
