import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PostCategoriesList from "../../components/backoffice/postCategories/PostCategoriesList.js";
import EditPostCategory from "../../components/backoffice/postCategories/EditPostCategory.js";
import AddPostCategory from "../../components/backoffice/postCategories/AddPostCategory.js";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader.js";
import DeleteModal from "../../components/common/modals/DeleteModal.js";
import Button from "../../components/common/Button.js";
import FetchError from "../../components/common/FetchError.js";
import {
  createPostCategory,
  deletePostCategory,
  fetchPostCategories,
  updatePostCategory,
} from "../../services/postCategoriesService.js";

function AdminPostCategories() {
  const [postCategories, setPostCategories] = useState(null);
  const [selectedPostCategory, setSelectedPostCategory] = useState(null);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const [fetchError, setFetchError] = useState(false);

  const navigate = useNavigate();

  function handleSelectedPostCategoryChange(e) {
    let selectedPostCategoryCopy = { ...selectedPostCategory };
    selectedPostCategoryCopy.name = e.target.value;
    setSelectedPostCategory(selectedPostCategoryCopy);
  }

  // Handling post category creation
  function handleAddCategoryConfirm(e, inputsObj) {
    e.preventDefault();

    const newCategory = {
      name: inputsObj.name,
    };

    createPostCategory(newCategory).then((res) => {
      if (res.status === "success") {
        setPostCategories((postCategories) => [
          ...postCategories,
          res.data.postCategory,
        ]);

        setIsAddCategoryModalOpen(false);

        toast.success("Post category added with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleEditIconClick(category) {
    setSelectedPostCategory(category);
    setIsEditCategoryModalOpen(true);
  }

  // Handling post category edit
  function handleEditCategoryConfirm(e, inputsObj) {
    e.preventDefault();

    updatePostCategory(selectedPostCategory._id, {
      name: inputsObj.name,
    }).then((res) => {
      if (res.status === "success") {
        setPostCategories((postCategories) =>
          postCategories.map((postCategory) =>
            postCategory._id === selectedPostCategory._id
              ? {
                  ...postCategory,
                  name: selectedPostCategory.name,
                }
              : postCategory
          )
        );

        setIsEditCategoryModalOpen(false);

        toast.success("Post category edited with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleDeleteIconClick(category) {
    setSelectedPostCategory(category);
    setIsDeleteCategoryModalOpen(true);
  }

  // Handling post category deletion
  function handleConfirmDeleteCategory() {
    const id = selectedPostCategory._id;

    deletePostCategory(id).then((res) => {
      if (res.status === "success") {
        setPostCategories((postCategories) =>
          postCategories.filter((postCategory) => postCategory._id !== id)
        );
        setIsDeleteCategoryModalOpen(false);

        toast.success("Post category deleted with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  useEffect(
    function () {
      fetchPostCategories().then((res) => {
        if (res.status === "success") {
          setPostCategories(res.data.postCategories);
          setFetchError(false);
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        } else {
          setFetchError(true);
        }
      });
    },
    [navigate]
  );

  if (fetchError) return <FetchError />;

  if (!postCategories) return <p>Loading...</p>;

  return (
    <section>
      <AdminPanelHeader headerTitle="Post categories" />

      <div className="admin-panel-content">
        <Button onClick={() => setIsAddCategoryModalOpen(true)}>New</Button>

        <PostCategoriesList
          categories={postCategories}
          onEditIcon={handleEditIconClick}
          onDeleteIcon={handleDeleteIconClick}
        />
      </div>

      {isAddCategoryModalOpen && (
        <AddPostCategory
          onCloseModal={() => setIsAddCategoryModalOpen(false)}
          onConfirm={handleAddCategoryConfirm}
          onCancel={() => setIsAddCategoryModalOpen(false)}
        />
      )}

      {isEditCategoryModalOpen && (
        <EditPostCategory
          onCloseModal={() => setIsEditCategoryModalOpen(false)}
          onConfirm={handleEditCategoryConfirm}
          onInputChange={handleSelectedPostCategoryChange}
          onCancel={() => setIsEditCategoryModalOpen(false)}
          selectedPostCategory={selectedPostCategory}
        />
      )}

      {isDeleteCategoryModalOpen && (
        <DeleteModal
          text="project category"
          onCancel={() => setIsDeleteCategoryModalOpen(false)}
          onCloseModal={() => setIsDeleteCategoryModalOpen(false)}
          onConfirm={handleConfirmDeleteCategory}
        />
      )}
    </section>
  );
}

export default AdminPostCategories;
