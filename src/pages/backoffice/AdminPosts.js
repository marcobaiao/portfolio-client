import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import lodash from "lodash";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import AdminPostsList from "../../components/backoffice/posts/AdminPostsList";
import DeleteModal from "../../components/common/modals/DeleteModal";
import TextInput from "../../components/common/inputs/TextInput";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";
import { fetchPostCategories } from "../../services/postCategoriesService";
import {
  deletePost,
  fetchPosts,
  updatePost,
} from "../../services/postsService";

function AdminPosts() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState("");
  const [titleFilter, setTitleFilter] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [postCategoriesOptions, setPostCategoriesOptions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumPosts, setTotalNumPosts] = useState(null);

  const pageSize = 6;

  const titleInputRef = useRef(null);
  const goButtonRef = useRef(null);

  const navigate = useNavigate();

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  // Handling enter click when searching a title
  function handleTitleInputKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goButtonRef.current.click();
    }
  }

  // Handling go button click
  function handleGoClick() {
    setTitleFilter(title);
    titleInputRef.current.focus();
  }

  function handleTechnologyFilter(value) {
    setCategoriesFilter(value.map((item) => item.value));
  }

  // Handling the activation and desactivation of a project
  function handleChangeActive(id, active) {
    updatePost(id, { active: !active }).then((res) => {
      if (res.status === "success") {
        setPosts((posts) =>
          posts.map((post) =>
            post._id === id ? { ...post, active: !active } : post
          )
        );

        if (active) toast.success("Post desactivated");
        else toast.success("Post activated");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else toast.error("There was an error trying to update the post.");
    });
  }

  function handleDeleteIconClick(post) {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  }

  // Handling the deletion of a post
  function handleDeletePostConfirm() {
    deletePost(selectedPost._id).then((res) => {
      if (res.status === "success") {
        setPosts((posts) =>
          posts.filter((post) => post._id !== selectedPost._id)
        );
        setIsDeleteModalOpen(false);
        toast.success("Post deleted.");
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      }
    });
  }

  // Fetching the posts
  useEffect(
    function () {
      fetchPosts(currentPage, pageSize, categoriesFilter, titleFilter).then(
        (res) => {
          if (res.status === "success") {
            setPosts(res.data.posts);
            setTotalNumPosts(res.total);
          }
        }
      );
    },
    [currentPage, pageSize, categoriesFilter, titleFilter]
  );

  // Fetching the post categories for filtering
  useEffect(
    function () {
      fetchPostCategories(
        currentPage,
        pageSize,
        categoriesFilter,
        titleFilter
      ).then((res) => {
        if (res.status === "success") {
          setPostCategoriesOptions(
            res.data.postCategories.map((item) => ({
              value: item._id,
              label: item.name,
            }))
          );
        } else if (res.code === 0) {
          navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
        }
      });
    },
    [categoriesFilter, currentPage, titleFilter, navigate]
  );

  if (!posts) return null;

  const pages = lodash.range(1, Math.ceil(totalNumPosts / pageSize) + 1);

  return (
    <section>
      <AdminPanelHeader headerTitle="Blog" />

      <div className="admin-panel-content">
        <div>
          <Link to="/admin/blog/new">
            <Button>New post</Button>
          </Link>
          <div className="flex flex-wrap gap-3 xl:gap-5 mt-5">
            <div className="flex w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-2/5 2xl:w-2/6">
              <TextInput
                inputRef={titleInputRef}
                value={title}
                onChange={handleTitleChange}
                className="w-full"
                placeholder="Search for a post..."
                onKeyDown={handleTitleInputKeyDown}
                clear
                onClear={() => setTitle("")}
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
              options={postCategoriesOptions}
              placeholder="Filter by technology"
            />
          </div>
        </div>

        <AdminPostsList
          posts={posts}
          onDeleteIconClick={handleDeleteIconClick}
          onActiveChange={handleChangeActive}
        />

        <div className="mt-10 w-full flex justify-end">
          <Pagination pages={pages} onSetCurrentPage={setCurrentPage} />
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          text="post"
          onCancel={() => setIsDeleteModalOpen(false)}
          onCloseModal={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeletePostConfirm}
        />
      )}
    </section>
  );
}

export default AdminPosts;
