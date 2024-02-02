import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPanelHeader from "../../components/backoffice/layout/AdminPanelHeader";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import RewindIcon from "../../components/common/icons/RewindIcon";
import FileInput from "../../components/common/inputs/FileInput";
import FormLabel from "../../components/common/FormLabel";
import Button from "../../components/common/Button";
import FetchError from "../../components/common/FetchError";
import {
  fetchInformation,
  updateInformation,
} from "../../services/fetchInformation";
import { getAPIImagesURL } from "../../utils";

function AdminGeneral() {
  const [information, setInformation] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newDescription, setNewDescription] = useState(null);

  const [fetchError, setFetchError] = useState(false);

  const navigate = useNavigate();

  const saveBtnDisabled = !newPhoto && !newDescription;

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setNewPhoto(file);
  }

  // Creating form data object to send on update request
  function createFormData() {
    let formData = new FormData();
    if (newPhoto) formData.append("photo", newPhoto);
    if (newDescription) formData.append("description", newDescription);
    return formData;
  }

  // Updating information
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = createFormData();

    updateInformation(information._id, formData).then((res) => {
      if (res.status === "success") {
        toast.success("Information updated with success");
        setNewPhoto(null);
        setNewDescription(null);
        setInformation(res.data.information);
      } else if (res.code === 0) {
        navigate(`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`);
      } else {
        toast.error(res.message);
      }
    });
  }

  // Fetching information
  useEffect(function () {
    fetchInformation().then((res) => {
      if (res.status === "success") {
        setInformation(res.data.information);
      } else {
        setFetchError(true);
      }
    });
  }, []);

  if (fetchError) return <FetchError />;

  if (!information) return <p>Loading</p>;

  const { photo, description } = information;

  return (
    <section className="w-full">
      <AdminPanelHeader headerTitle="General">
        <Button onClick={handleSubmit} disabled={saveBtnDisabled}>
          Save
        </Button>
      </AdminPanelHeader>

      <form className="admin-panel-content">
        <div className="flex flex-col">
          <FormLabel text="Current photo" />
          {(newPhoto || photo) && (
            <div className="flex items-center mb-4">
              <img
                src={
                  newPhoto
                    ? URL.createObjectURL(newPhoto)
                    : `${getAPIImagesURL()}/${photo}`
                }
                alt="me"
                className="h-24 w-24 rounded-full object-cover"
              />

              <RewindIcon
                disabled={!newPhoto}
                onClick={() => setNewPhoto(null)}
              />
            </div>
          )}

          <FileInput
            name="photo"
            labelText={photo ? "Change photo" : "Select photo"}
            onChange={handlePhotoChange}
            accept="image/*"
          />
        </div>

        <div className="mt-5 flex flex-col">
          <FormLabel text="Texto de introdução" />

          <div className="flex items-center">
            <TextAreaInput
              name="description"
              rows={3}
              className="w-full lg:w-2/3 xl:w-2/4 2xl:w-2/5"
              value={newDescription ? newDescription : description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <RewindIcon
              disabled={!newDescription}
              onClick={() => setNewDescription(null)}
            />
          </div>
        </div>
      </form>
    </section>
  );
}

export default AdminGeneral;
