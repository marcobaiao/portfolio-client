import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import TextInput from "../../components/common/inputs/TextInput";
import FileInput from "../../components/common/inputs/FileInput";
import FormLabel from "../../components/common/FormLabel";
import ImageItem from "../../components/common/ImageItem";
import Editor from "../../components/common/Editor";
import Button from "../../components/common/Button";
import { postSchema } from "../../joi-schemas";
import { fetchPostCategories } from "../../services/postCategoriesService";
import { createPost } from "../../services/postsService";
import {
  renderErrorWarningIcon,
  renderErrorsAlertBox,
  schemaValidation,
} from "../../utils";

function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [postCategoriesOptions, setPostCategoriesOptions] = useState([]);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  function handleCategoriesChange(value) {
    setCategories(value);
  }

  function handleThumbnailImgChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setThumbnailImg(file);
  }

  // Validating post according to post schema
  function validatePost() {
    return schemaValidation(postSchema, {
      title,
      description,
      thumbnailImg,
      categories,
      content,
    });
  }

  // Creating form data object to send in create post request
  function createFormData() {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnailImg", thumbnailImg);
    categories.forEach((category) => {
      formData.append("categories", category.id);
    });
    formData.append("content", content);

    return formData;
  }

  // Validating form and creating post
  function handleSave() {
    const validation = validatePost();

    if (!validation.error) {
      setErrors(null);

      const formData = createFormData();

      createPost(formData).then((res) => {
        if (res.status === "success") {
          navigate("/admin/blog");
          toast.success("Post created with success");
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        } else toast.error(res.message);
      });
    } else {
      setErrors(validation.error.details);
    }
  }

  // Fetching post categories to associate to the project
  useEffect(
    function () {
      fetchPostCategories().then((res) => {
        if (res.status === "success") {
          setPostCategoriesOptions(
            res.data.postCategories.map((postCategory) => ({
              id: postCategory._id,
              value: postCategory.name,
              label: postCategory.name,
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
      <AdminPanelHeader headerTitle="New post">
        <div className="flex items-center">
          {renderErrorWarningIcon(errors)}

          <Button onClick={handleSave}>Save</Button>
        </div>
      </AdminPanelHeader>

      <div className="admin-panel-content">
        {renderErrorsAlertBox(errors)}

        <form>
          <div className="mb-7">
            <FormLabel text="Title" />
            <TextInput
              placeholder="Title"
              className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              clear
              onClear={() => setTitle("")}
            />
          </div>

          <div className="mb-6">
            <FormLabel text="Description" />

            <TextAreaInput
              name="description"
              placeholder="Description"
              className="w-2/3 sm:w-2/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-7">
            <FormLabel text="Categories" />
            <Select
              className="w-full sm:w-3/4 md:w-full lg:w-2/3 xl:w-2/4 2xl:w-1/4"
              value={categories}
              isMulti
              onChange={handleCategoriesChange}
              options={postCategoriesOptions}
            />
          </div>

          <div className="mb-5">
            <FormLabel text="Thumbnail image" />

            <ImageItem
              image={thumbnailImg}
              className="mb-3"
              height="20"
              width="28"
            />

            <FileInput
              labelText={thumbnailImg ? "Change photo" : "Select photo"}
              name="photo"
              onChange={handleThumbnailImgChange}
              accept="image/*"
            />
          </div>

          <div>
            <FormLabel text="Content" />
            <Editor initialValue="" onSetContent={setContent} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewPost;
