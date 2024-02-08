import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import lodash from "lodash";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import CancelChangesModal from "../../components/common/modals/CancelChangesModal";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import RewindIcon from "../../components/common/icons/RewindIcon";
import TextInput from "../../components/common/inputs/TextInput";
import FileInput from "../../components/common/inputs/FileInput";
import ImagesList from "../../components/common/ImagesList";
import ImageItem from "../../components/common/ImageItem";
import FormLabel from "../../components/common/FormLabel";
import Button from "../../components/common/Button";
//import Editor from "../../components/common/Editor";
import Editor from "../../components/common/DraftEditor";
import { fetchProjectCategories } from "../../services/projectCategoriesService";
import { fetchProject, updateProject } from "../../services/projectsService";
import {
  renderErrorWarningIcon,
  renderErrorsAlertBox,
  schemaValidation,
} from "../../utils";
import { projectSchema } from "../../joi-schemas";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

function EditProject() {
  const [project, setProject] = useState(null);

  const [newName, setNewName] = useState(null);
  const [newResume, setNewResume] = useState(null);
  const [newCategories, setNewCategories] = useState(null);
  const [newThumbnailImg, setNewThumbnailImg] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imagesToKeep, setImagesToKeep] = useState(null);
  const [newContent, setNewContent] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [projectCategoriesOptions, setProjectCategoriesOptions] =
    useState(null);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [errors, setErrors] = useState(null);

  const isSaveBtnDisabled =
    !newName &&
    !newResume &&
    !newCategories &&
    !newThumbnailImg &&
    newImages.length === 0 &&
    lodash.isEqual(imagesToKeep, project && project.images) &&
    !newContent;

  const navigate = useNavigate();

  const params = useParams();

  function handleThumbnailImgChange(e) {
    const file = e.target.files[0];
    setNewThumbnailImg(file);
  }

  function handleImagesChange(e) {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      setNewImages((images) => [...images, file]);
    });
  }

  function handleCategoriesChange(value) {
    const projectCategoriesFormatted = project.categories.map((category) => ({
      id: category._id,
      value: category.name,
      label: category.name,
    }));

    setNewCategories(value);

    if (lodash.isEqual(projectCategoriesFormatted, value))
      setNewCategories(null);
    else setNewCategories(value);
  }

  function handleInputChange(e, setNewState) {
    const name = e.target.name;
    const value = e.target.value;

    if (value === project[name]) {
      setNewState(null);
    } else {
      setNewState(value);
    }
  }

  function handleImagesRewind() {
    setImagesToKeep(project.images);
    setNewImages([]);
  }

  function handleProjectImgDelete(image) {
    setImagesToKeep((images) => images.filter((img) => img !== image));
  }

  function handleNewImagesDelete(image) {
    setNewImages((images) => images.filter((img) => img !== image));
  }

  function validate() {
    return schemaValidation(projectSchema, {
      name: newName || project.name,
      resume: newResume || project.resume,
      thumbnailImg: newThumbnailImg || project.thumbnailImg,
      technologies: newCategories || project.categories,
      images: [...newImages, ...imagesToKeep],
      description: draftToHtml(newContent) || project.description,
    });
  }

  // Creating Form Data to send in project edition
  function createFormData() {
    let formData = new FormData();
    if (newName) formData.append("name", newName);
    if (newResume) formData.append("resume", newResume);
    if (newCategories)
      newCategories.forEach((category) => {
        formData.append("categories", category.id);
      });

    if (newThumbnailImg) formData.append("thumbnailImg", newThumbnailImg);

    if (newImages.length > 0)
      newImages.forEach((newImage) => {
        formData.append("images", newImage);
      });

    if (imagesToKeep && imagesToKeep.length > 0) {
      imagesToKeep.forEach((img) => {
        formData.append("images", img);
      });
    }

    if (newContent) formData.append("description", draftToHtml(newContent));

    return formData;
  }

  // Validation form data and updating the project
  function handleProjectSubmit() {
    const validation = validate();

    if (!validation.error) {
      const formData = createFormData();

      updateProject(project._id, formData, true).then((res) => {
        if (res.status === "success") {
          navigate("/admin/projects");
          toast.success("Project updated with success.");
          setErrors(null);
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        } else {
          toast.error(res.message);
        }
      });
    } else {
      setErrors(validation.error.details);
    }
  }

  function handleCancelBtnClick() {
    if (isSaveBtnDisabled) navigate("/admin/projects");
    else setIsCancelModalOpen(true);
  }

  // Fetching selected project
  useEffect(
    function () {
      fetchProject(params.projectId).then((res) => {
        if (res.status === "success") {
          const html = res.data.project.description;
          const contentBlock = htmlToDraft(html);
          console.log(contentBlock);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);

          setProject(res.data.project);
          setImagesToKeep(res.data.project.images);
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        }
      });
    },
    [params.projectId, navigate]
  );

  // Fetching project categories
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

  if (!project) return null;

  return (
    <section>
      <AdminPanelHeader headerTitle="Edit project">
        <div className="flex items-center">
          {renderErrorWarningIcon(errors)}

          <Button
            onClick={handleCancelBtnClick}
            color="red-600"
            hoverColor="red-700"
            className="mr-3"
          >
            Cancel
          </Button>
          <Button onClick={handleProjectSubmit} disabled={isSaveBtnDisabled}>
            Save
          </Button>
        </div>
      </AdminPanelHeader>

      <div className="admin-panel-content">
        {renderErrorsAlertBox(errors)}
        <form>
          <div className="mb-5">
            <FormLabel text="Name" />
            <div className="flex items-center">
              <TextInput
                placeholder="Name"
                className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
                value={newName ? newName : project.name}
                onChange={(e) => handleInputChange(e, setNewName)}
              />
              <RewindIcon
                disabled={!newName}
                onClick={() => setNewName(null)}
              />
            </div>
          </div>

          <div className="mb-5">
            <FormLabel text="Resume" />
            <div className="flex items-center">
              <TextAreaInput
                placeholder="Resume"
                className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/2"
                value={newResume ? newResume : project.resume}
                onChange={(e) => handleInputChange(e, setNewResume)}
              />
              <RewindIcon
                disabled={!newResume}
                onClick={() => setNewResume(null)}
              />
            </div>
          </div>

          <div className="mb-5">
            <FormLabel text="Technologies used" />
            <div className="flex items-center">
              <Select
                className="w-full sm:w-3/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
                value={
                  newCategories
                    ? newCategories
                    : project.categories.map((category) => ({
                        id: category._id,
                        value: category.name,
                        label: category.name,
                      }))
                }
                isMulti
                onChange={handleCategoriesChange}
                options={projectCategoriesOptions}
              />
              <RewindIcon
                disabled={!newCategories}
                onClick={() => setNewCategories(null)}
              />
            </div>
          </div>

          <div className="mb-5">
            <FormLabel text="Thumbnail image" />
            {(project.thumbnailImg || newThumbnailImg) && (
              <div className="flex items-center mb-3">
                <ImageItem
                  image={newThumbnailImg || project.thumbnailImg}
                  remove={false}
                  existingImage={!newThumbnailImg}
                  folder="projects"
                  height="24"
                  width="20"
                />

                <RewindIcon
                  disabled={!newThumbnailImg}
                  onClick={() => setNewThumbnailImg(null)}
                />
              </div>
            )}

            <FileInput
              labelText="Change image"
              name="photo"
              onChange={handleThumbnailImgChange}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Images" />
            <div className="flex flex-wrap items-center mb-5 gap-2">
              <ImagesList
                images={imagesToKeep}
                onImgRemove={handleProjectImgDelete}
                existingImage={true}
                folder="projects"
              />
              <ImagesList
                images={newImages}
                onImgRemove={handleNewImagesDelete}
              />
              <RewindIcon
                disabled={
                  newImages.length === 0 &&
                  lodash.isEqual(imagesToKeep, project.images)
                }
                onClick={handleImagesRewind}
              />
            </div>

            <FileInput
              name="photo"
              labelText="Add image(s)"
              multiple={true}
              onChange={handleImagesChange}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Description" />
            {/*<Editor
              initialValue={project.description}
              onSetContent={setNewContent}
              />*/}

            <Editor
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
              onContentStateChange={(content) => setNewContent(content)}
            />
          </div>
        </form>
      </div>

      {isCancelModalOpen && (
        <CancelChangesModal
          onCancel={() => setIsCancelModalOpen(false)}
          onConfirm={() => navigate("/adminpanel/blog")}
        />
      )}
    </section>
  );
}

export default EditProject;
