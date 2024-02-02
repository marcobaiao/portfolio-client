import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectCategoriesList from "../../components/backoffice/projectCategories/ProjectCategoriesList";
import EditProjectCategory from "../../components/backoffice/projectCategories/EditProjectCategory";
import AddProjectCategory from "../../components/backoffice/projectCategories/AddProjectCategory";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import DeleteModal from "../../components/common/modals/DeleteModal";
import Button from "../../components/common/Button";
import FetchError from "../../components/common/FetchError";
import {
  createProjectCategory,
  deleteProjectCategory,
  fetchProjectCategories,
  updateProjectCategory,
} from "../../services/projectCategoriesService";

function AdminProjectCategories() {
  const [projectCategories, setProjectCategories] = useState(null);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState(null);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const [fetchError, setFetchError] = useState(false);

  const navigate = useNavigate();

  // Handling project category creation
  function handleAddCategoryConfirm(e, inputsObj) {
    e.preventDefault();

    const newCategory = {
      name: inputsObj.name,
    };

    createProjectCategory(newCategory).then((res) => {
      if (res.status === "success") {
        setProjectCategories((projectCategories) => [
          ...projectCategories,
          res.data.projectCategory,
        ]);

        setIsAddCategoryModalOpen(false);

        toast.success("Project category created with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleAddCategoryCancel() {
    setIsAddCategoryModalOpen(false);
  }

  function handleEditIconClick(category) {
    setSelectedProjectCategory(category);
    setIsEditCategoryModalOpen(true);
  }

  // Handling project category edit
  function handleEditCategoryConfirm(e, inputsObj) {
    e.preventDefault();

    updateProjectCategory(selectedProjectCategory._id, {
      name: inputsObj.name,
    }).then((res) => {
      if (res.status === "success") {
        setProjectCategories((projectCategories) =>
          projectCategories.map((projectCategory) =>
            projectCategory._id === selectedProjectCategory._id
              ? {
                  ...projectCategory,
                  name: selectedProjectCategory.name,
                }
              : projectCategory
          )
        );

        setIsEditCategoryModalOpen(false);

        toast.success("Project category updated with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleSelectedProjectCategoryChange(e) {
    let selectedProjectCategoryCopy = { ...selectedProjectCategory };
    selectedProjectCategoryCopy.name = e.target.value;
    setSelectedProjectCategory(selectedProjectCategoryCopy);
  }

  function handleDeleteIconClick(category) {
    setSelectedProjectCategory(category);
    setIsDeleteCategoryModalOpen(true);
  }

  // Handling project category deletion
  function handleConfirmDeleteCategory() {
    const id = selectedProjectCategory._id;

    deleteProjectCategory(id).then((res) => {
      if (res.status === "success") {
        setProjectCategories((projectCategories) =>
          projectCategories.filter(
            (projectCategory) => projectCategory._id !== id
          )
        );

        setIsDeleteCategoryModalOpen(false);

        toast.success("Project deleted with success.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  // Fetching project categories
  useEffect(
    function () {
      fetchProjectCategories().then((res) => {
        if (res.status === "success") {
          setProjectCategories(res.data.projectCategories);
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

  if (!projectCategories) return <p>Loading...</p>;

  return (
    <section>
      <AdminPanelHeader headerTitle="Project categories" />

      <div className="admin-panel-content">
        <Button onClick={() => setIsAddCategoryModalOpen(true)}>New</Button>

        <ProjectCategoriesList
          categories={projectCategories}
          onEditIconClick={handleEditIconClick}
          onDeleteIconClick={handleDeleteIconClick}
        />
      </div>

      {isAddCategoryModalOpen && (
        <AddProjectCategory
          onCloseModal={() => setIsAddCategoryModalOpen(false)}
          onConfirm={handleAddCategoryConfirm}
          onCancel={handleAddCategoryCancel}
        />
      )}

      {isEditCategoryModalOpen && (
        <EditProjectCategory
          onCloseModal={() => setIsEditCategoryModalOpen(false)}
          onConfirm={handleEditCategoryConfirm}
          onCancel={() => setIsEditCategoryModalOpen(false)}
          selectedProjectCategory={selectedProjectCategory}
          onInputChange={handleSelectedProjectCategoryChange}
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

export default AdminProjectCategories;
