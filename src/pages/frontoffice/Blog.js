import { useEffect, useRef, useState } from "react";
import lodash from "lodash";
import Select from "react-select";
import SectionTitle from "../../components/frontoffice/SectionTitle";
import { fetchPostCategories } from "../../services/postCategoriesService";
import { fetchPosts } from "../../services/postsService";
import PostsList from "../../components/frontoffice/blog/PostsList";
import Pagination from "../../components/common/Pagination";
import TextInput from "../../components/common/inputs/TextInput";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";

function Blog() {
  const [posts, setPosts] = useState(null);
  const [postCategoriesOptions, setPostCategoriesOptions] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [titleFilter, setTitleFilter] = useState(null);
  const [totalNumPosts, setTotalNumPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const titleInputRef = useRef(null);
  const goButtonRef = useRef(null);

  const pageSize = 4;

  function handleTechnologyFilter(value) {
    setCategoriesFilter(value.map((item) => item.value));
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTitleClear() {
    setTitle("");
    titleInputRef.current.focus();
  }

  function handleGoClick() {
    setTitleFilter(title);
    titleInputRef.current.focus();
  }

  function handleTitleInputKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goButtonRef.current.click();
    }
  }

  useEffect(function () {
    fetchPostCategories().then((res) => {
      if (res.status === "success") {
        setPostCategoriesOptions(
          res.data.postCategories.map((item) => ({
            value: item._id,
            label: item.name,
          }))
        );
      }
    });
  }, []);

  useEffect(
    function () {
      fetchPosts(currentPage, pageSize, categoriesFilter, titleFilter).then(
        (res) => {
          if (res.status === "success") {
            setIsLoading(true);
            setPosts(res.data.posts);
            setTotalNumPosts(res.total);
            setIsLoading(false);
          }
        }
      );
    },
    [currentPage, pageSize, categoriesFilter, titleFilter]
  );

  const pages = lodash.range(1, Math.ceil(totalNumPosts / pageSize) + 1);

  if (isLoading) return <Spinner />;

  return (
    <section className="flex flex-col items-center px-10 py-7">
      <SectionTitle title="Blog" />

      <div className="mb-2 w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/6 flex gap-2">
        <TextInput
          inputRef={titleInputRef}
          name="title"
          placeholder="Search for a title"
          className="w-full"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleTitleInputKeyDown}
          onClear={handleTitleClear}
          clear
        />
        <Button
          buttonRef={goButtonRef}
          className="float-right"
          onClick={handleGoClick}
        >
          Go
        </Button>
      </div>

      <Select
        options={postCategoriesOptions}
        className="mb-10 w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/6"
        placeholder="Filter by technology"
        isMulti
        onChange={handleTechnologyFilter}
      />

      <div>
        <PostsList posts={posts} />
        <div className="mt-10 w-full flex justify-end">
          <Pagination pages={pages} onSetCurrentPage={setCurrentPage} />
        </div>
      </div>
    </section>
  );
}

export default Blog;
