import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import FormLabel from "../../components/common/FormLabel";
import TextInput from "../../components/common/inputs/TextInput";
import FileInput from "../../components/common/inputs/FileInput";
import Button from "../../components/common/Button";
import ImagesList from "../../components/common/ImagesList";
import ImageItem from "../../components/common/ImageItem";
//import Editor from "../../components/common/Editor";
import Editor from "../../components/common/DraftEditor";
import { fetchProjectCategories } from "../../services/projectCategoriesService";
import { createProject } from "../../services/projectsService";
import {
  renderErrorWarningIcon,
  renderErrorsAlertBox,
  schemaValidation,
} from "../../utils";
import { projectSchema } from "../../joi-schemas";
import draftToHtml from "draftjs-to-html";
import { EditorState } from "draft-js";

function NewProject() {
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");
  const [technologies, setTechnologies] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState("");

  const [projectCategoriesOptions, setProjectCategoriesOptions] =
    useState(null);

  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setThumbnailImg(file);
  }

  function handleImagesChange(e) {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (images.length === 0) setImages((images) => [...images, file]);
      else if (images.find((image) => image.name === file.name) === undefined) {
        setImages((images) => [...images, file]);
      }
    });
  }

  function handleImgRemove(image) {
    setImages((images) => images.filter((img) => img.name !== image.name));
  }

  function handleSelectChange(value) {
    setTechnologies(value);
  }

  // Validating the project according to the project schema
  function validateProject() {
    return schemaValidation(projectSchema, {
      name,
      resume,
      technologies,
      thumbnailImg,
      images,
      description: draftToHtml(description),
    });
  }

  // Constructing the FormData to send for project creation
  function createFormData() {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("resume", resume);

    technologies.forEach((technology) => {
      formData.append("categories", technology.id);
    });

    if (thumbnailImg) formData.append("thumbnailImg", thumbnailImg);

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("description", draftToHtml(description));

    return formData;
  }

  // Validating the project and creating it
  async function handleProjectSubmit() {
    const validation = validateProject();

    if (!validation.error) {
      let formData = createFormData();

      createProject(formData).then((res) => {
        if (res.status === "success") {
          navigate("/admin/projects");
          toast.success("Project created with success.");
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        } else {
          toast.error(res.message);
        }
      });

      setErrors(null);
    } else {
      setErrors(validation.error.details);
    }
  }

  // Fetching project categories to select in project creation
  useEffect(
    function () {
      fetchProjectCategories().then((res) => {
        if (res.status === "success") {
          setProjectCategoriesOptions(
            res.data.projectCategories.map((projectCategory) => ({
              id: projectCategory._id,
              value: projectCategory.name,
              label: projectCategory.name,
            }))
          );
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        }
      });
    },
    [navigate]
  );

  return (
    <section>
      <AdminPanelHeader headerTitle="New project">
        <div className="flex items-center">
          {renderErrorWarningIcon(errors)}
          <Button onClick={handleProjectSubmit}>Save</Button>
        </div>
      </AdminPanelHeader>

      <div className="admin-panel-content">
        {renderErrorsAlertBox(errors)}

        <form>
          <div className="mb-5">
            <FormLabel text="Name" />
            <TextInput
              placeholder="Name"
              className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clear
              onClear={() => setName("")}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Resume" />
            <TextAreaInput
              placeholder="Resume"
              className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/2"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Technologies used" />
            <Select
              className="w-full sm:w-3/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
              value={technologies}
              isMulti
              onChange={handleSelectChange}
              options={projectCategoriesOptions}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Thumbnail image" />

            <ImageItem
              image={thumbnailImg}
              height="20"
              width="28"
              className="mb-3"
              remove={false}
            />

            <FileInput
              name="photo"
              labelText={thumbnailImg ? "Change photo" : "Select photo"}
              onChange={handlePhotoChange}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Images" />

            <ImagesList images={images} onImgRemove={handleImgRemove} />

            <FileInput
              name="photo"
              labelText={images.length > 0 ? "Change photos" : "Select photo"}
              onChange={handleImagesChange}
              multiple={true}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Description" />

            {/*<Editor initialValue="" onSetContent={setDescription} />*/}

            <Editor
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
              onContentStateChange={(content) => setDescription(content)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewProject;
