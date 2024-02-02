import { useEffect, useState } from "react";
import lodash from "lodash";
import Select from "react-select";
import ProjectsList from "../../components/frontoffice/projects/ProjectsList";
import SectionTitle from "../../components/frontoffice/SectionTitle";
import Pagination from "../../components/common/Pagination";
import { fetchProjectCategories } from "../../services/projectCategoriesService";
import { fetchProjects } from "../../services/projectsService";
import Spinner from "../../components/common/Spinner";

function Projects() {
  const [projects, setProjects] = useState(null);
  const [projectCategoriesOptions, setProjectCategoriesOptions] =
    useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [totalNumProjects, setTotalNumProjects] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const isLoading = !projects || !projectCategoriesOptions;

  function handleTechnologyFilter(value) {
    setCategoriesFilter(value.map((item) => item.value));
  }

  useEffect(function () {
    fetchProjectCategories().then((res) => {
      if (res.status === "success") {
        setProjectCategoriesOptions(
          res.data.projectCategories.map((item) => ({
            value: item._id,
            label: item.name,
          }))
        );
      }
    });
  }, []);

  useEffect(
    function () {
      fetchProjects(currentPage, pageSize, categoriesFilter).then((res) => {
        if (res.status === "success") {
          setProjects(res.data.projects);
          setTotalNumProjects(res.total);
        }
      });
    },
    [currentPage, pageSize, categoriesFilter]
  );

  const pages = lodash.range(1, Math.ceil(totalNumProjects / pageSize) + 1);

  if (isLoading) return <Spinner />;

  return (
    <section className="flex flex-col items-center px-10 py-7">
      <SectionTitle title="Projects" />

      <Select
        options={projectCategoriesOptions}
        className="mb-10 w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/6"
        placeholder="Filter by technology"
        isMulti
        onChange={handleTechnologyFilter}
      />

      <div>
        <ProjectsList projects={projects} />
        <div className="mt-10 w-full flex justify-end">
          <Pagination pages={pages} onSetCurrentPage={setCurrentPage} />
        </div>
      </div>
    </section>
  );
}

export default Projects;
