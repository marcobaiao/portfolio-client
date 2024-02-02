import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import lodash from "lodash";
import AdminProjectsList from "../../components/backoffice/projects/AdminProjectsList";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import DeleteModal from "../../components/common/modals/DeleteModal";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/inputs/TextInput";
import {
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../services/projectsService";
import { fetchProjectCategories } from "../../services/projectCategoriesService";
import Pagination from "../../components/common/Pagination";

function AdminProjects() {
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [name, setName] = useState("");
  const [projectCategoriesOptions, setProjectCategoriesOptions] =
    useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [totalNumProjects, setTotalNumProjects] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const nameInputRef = useRef(null);
  const goButtonRef = useRef(null);

  const pageSize = 6;

  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Handling enter click when searching a name
  function handleNameInputKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goButtonRef.current.click();
    }
  }

  // Handling go button click
  function handleGoClick() {
    setNameFilter(name);
    nameInputRef.current.focus();
  }

  function handleTechnologyFilter(value) {
    setCategoriesFilter(value.map((item) => item.value));
  }

  // Handling the activation and desactivation of a project
  function handleChangeActive(id, name, active) {
    updateProject(id, { active: !active }).then((res) => {
      if (res.status === "success") {
        setProjects((projects) =>
          projects.map((project) =>
            project._id === id ? { ...project, active: !active } : project
          )
        );

        if (active) toast.success("Project desactivated.");
        else toast.success("Project activated.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else toast.error("There was an error trying to update the project.");
    });
  }

  function handleDeleteIconClick(project) {
    setSelectedProject(project);
    setIsDeleteProjectModalOpen(true);
  }

  // Handling cancel button click on delete project modal
  function handleDeleteProjectModalCancel() {
    setIsDeleteProjectModalOpen(false);
  }

  // Handling the deletion of a project
  function handleDeleteProjectModalConfirm() {
    deleteProject(selectedProject._id).then((res) => {
      if (res.status === "success") {
        setProjects((projects) =>
          projects.filter((project) => project._id !== selectedProject._id)
        );

        setIsDeleteProjectModalOpen(false);

        toast.success("Project deleted.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  // Fetching the projects
  useEffect(
    function () {
      fetchProjects(currentPage, pageSize, categoriesFilter, nameFilter).then(
        (res) => {
          if (res.status === "success") {
            setProjects(res.data.projects);
            setTotalNumProjects(res.total);
          } else if (res.code === 0) {
            navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
          }
        }
      );
    },
    [currentPage, pageSize, categoriesFilter, nameFilter, navigate]
  );

  // Fetching the project categories for filtering
  useEffect(
    function () {
      fetchProjectCategories().then((res) => {
        if (res.status === "success") {
          setProjectCategoriesOptions(
            res.data.projectCategories.map((item) => ({
              value: item._id,
              label: item.name,
            }))
          );
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        }
      });
    },
    [navigate]
  );

  if (!projects) return null;

  // Calculating the number of pages for pagination component
  const pages = lodash.range(1, Math.ceil(totalNumProjects / pageSize) + 1);

  return (
    <section>
      <AdminPanelHeader headerTitle="Projects" />

      <div className="admin-panel-content">
        <div>
          <Link to="/admin/projects/new">
            <Button>New project</Button>
          </Link>
          <div className="flex flex-wrap gap-3 xl:gap-5 mt-5">
            <div className="flex w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-2/5 2xl:w-2/6">
              <TextInput
                inputRef={nameInputRef}
                value={name}
                onChange={handleNameChange}
                className="w-full"
                placeholder="Search for a project..."
                onKeyDown={handleNameInputKeyDown}
                clear
                onClear={() => setName("")}
              />
              <Button
                buttonRef={goButtonRef}
                className="ml-2"
                onClick={handleGoClick}
              >
                Go
              </Button>
            </div>
            <Select
              className="w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-2/5 2xl:w-2/6"
              isMulti
              onChange={handleTechnologyFilter}
              options={projectCategoriesOptions}
              placeholder="Filter by technology"
            />
          </div>
        </div>

        <AdminProjectsList
          projects={projects}
          onDeleteIconClick={handleDeleteIconClick}
          onActiveChange={handleChangeActive}
        />

        <div className="mt-10 w-full flex justify-end">
          <Pagination pages={pages} onSetCurrentPage={setCurrentPage} />
        </div>
      </div>

      {isDeleteProjectModalOpen && (
        <DeleteModal
          text="project"
          onCancel={handleDeleteProjectModalCancel}
          onConfirm={handleDeleteProjectModalConfirm}
        />
      )}
    </section>
  );
}

export default AdminProjects;
