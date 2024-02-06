import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import lodash from "lodash";
import Select from "react-select";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import CancelChangesModal from "../../components/common/modals/CancelChangesModal";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import RewindIcon from "../../components/common/icons/RewindIcon";
import TextInput from "../../components/common/inputs/TextInput";
import FileInput from "../../components/common/inputs/FileInput";
import FormLabel from "../../components/common/FormLabel";
import Button from "../../components/common/Button";
//import Editor from "../../components/common/Editor";
import Editor from "../../components/common/DraftEditor";
import { ContentState, EditorState } from "draft-js";
import { fetchPostCategories } from "../../services/postCategoriesService";
import { fetchPost, updatePost } from "../../services/postsService";
import {
  renderErrorWarningIcon,
  renderErrorsAlertBox,
  schemaValidation,
} from "../../utils";
import { postSchema } from "../../joi-schemas";
import ImageItem from "../../components/common/ImageItem";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

function EditPost() {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [postCategoriesOptions, setPostCategoriesOptions] = useState([]);

  const [newTitle, setNewTitle] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [newCategories, setNewCategories] = useState(null);
  const [newThumbnailImg, setNewThumbnailImg] = useState(null);
  const [newContent, setNewContent] = useState(null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const saveBtnDisabled =
    !newTitle &&
    !newDescription &&
    !newCategories &&
    !newThumbnailImg &&
    !newContent;

  function handleCategoriesChange(value) {
    const postCategoriesFormatted = post.categories.map((category) => ({
      id: category._id,
      value: category.name,
      label: category.name,
    }));

    setNewCategories(value);

    if (lodash.isEqual(postCategoriesFormatted, value)) setNewCategories(null);
    else setNewCategories(value);
  }

  function handleThumbnailImgChange(e) {
    const file = e.target.files[0];
    setNewThumbnailImg(file);
  }

  function handleThumbnailImageRewind() {
    setNewThumbnailImg(null);
  }

  // Validating post according to post schema
  function validatePost() {
    return schemaValidation(postSchema, {
      title: newTitle || post.title,
      description: newDescription || post.description,
      categories: newCategories || post.categories,
      thumbnailImg: newThumbnailImg || post.thumbnailImg,
      content: draftToHtml(newContent) || post.content,
    });
  }

  // Creating form data
  function createFormData() {
    const formData = new FormData();

    if (newTitle) formData.append("title", newTitle);
    if (newDescription) formData.append("description", newDescription);
    if (newCategories) {
      newCategories.forEach((category) => {
        formData.append("categories", category.id);
      });
    }

    if (newThumbnailImg) formData.append("thumbnailImg", newThumbnailImg);
    if (newContent) formData.append("content", draftToHtml(newContent));

    return formData;
  }

  // Handling post validation and updating post
  function handleSave() {
    const validation = validatePost();

    if (!validation.error) {
      const formData = createFormData();

      updatePost(post._id, formData, true).then((res) => {
        if (res.status === "success") {
          navigate("/admin/blog");
          toast.success("Post updated with success");
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

  function handleInputChange(e, setNewState) {
    const name = e.target.name;
    const value = e.target.value;

    if (value === post[name]) {
      setNewState(null);
    } else {
      setNewState(value);
    }
  }

  function handleCancelBtnClick() {
    if (saveBtnDisabled) navigate("/admin/blog");
    else setIsCancelModalOpen(true);
  }

  // Fetching post categories
  useEffect(function () {
    fetchPostCategories().then((res) => {
      if (res.status === "success") {
        setPostCategoriesOptions(
          res.data.postCategories.map((postCategory) => ({
            id: postCategory._id,
            value: postCategory.name,
            label: postCategory.name,
          }))
        );
      }
    });
  }, []);

  // Fetching selected post
  useEffect(
    function () {
      fetchPost(params.id).then((res) => {
        if (res.status === "success") {
          const html = res.data.post.content;
          const contentBlock = htmlToDraft(html);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);

          setPost(res.data.post);
        }
      });
    },
    [params.id]
  );

  if (!post) return null;

  return (
    <section>
      <AdminPanelHeader headerTitle="Edit Post">
        <div className="flex items-center">
          {renderErrorWarningIcon(errors)}

          <Button
            onClick={handleCancelBtnClick}
            color="red-700"
            hoverColor="red-800"
            className="mr-2"
          >
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={saveBtnDisabled}>
            Save
          </Button>
        </div>
      </AdminPanelHeader>

      <div className="admin-panel-content">
        {renderErrorsAlertBox(errors)}

        <form>
          <div>
            <FormLabel text="Title" />
            <div className="mb-5 flex items-center">
              <TextInput
                name="title"
                placeholder="Title"
                className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-2/5"
                value={newTitle ? newTitle : post.title}
                onChange={(e) => handleInputChange(e, setNewTitle)}
              />

              <RewindIcon
                disabled={!newTitle}
                onClick={() => setNewTitle(null)}
              />
            </div>
          </div>

          <div>
            <FormLabel text="Description" />
            <div className="mb-5 flex items-center">
              <TextAreaInput
                name="description"
                placeholder="Description"
                className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-2/3"
                value={newDescription ? newDescription : post.description}
                onChange={(e) => handleInputChange(e, setNewDescription)}
              />

              <RewindIcon
                disabled={!newDescription}
                onClick={() => setNewDescription(null)}
              />
            </div>
          </div>

          <div className="mb-5">
            <FormLabel text="Categories" />

            <div className="flex items-center">
              <Select
                className="w-full sm:w-3/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-2/5"
                value={
                  newCategories
                    ? newCategories
                    : post.categories.map((category) => ({
                        id: category._id,
                        value: category.name,
                        label: category.name,
                      }))
                }
                isMulti
                onChange={handleCategoriesChange}
                options={postCategoriesOptions}
              />
              <RewindIcon
                disabled={!newCategories}
                onClick={() => setNewCategories(null)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-lg">
              Thumbnail image
            </label>
            {(post.thumbnailImg || newThumbnailImg) && (
              <div className="flex items-center mb-3">
                <ImageItem
                  image={newThumbnailImg || post.thumbnailImg}
                  remove={false}
                  existingImage={!newThumbnailImg}
                  folder="posts"
                />

                <RewindIcon
                  disabled={!newThumbnailImg}
                  onClick={handleThumbnailImageRewind}
                />
              </div>
            )}

            <FileInput
              labelText="Change image"
              name="photo"
              onChange={handleThumbnailImgChange}
            />
          </div>

          <div>
            <FormLabel text="Content" />
            {/*<Editor initialValue={post.content} onSetContent={setNewContent} />*/}

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

export default EditPost;
