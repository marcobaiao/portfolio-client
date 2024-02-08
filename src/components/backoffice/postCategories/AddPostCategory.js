import { useEffect, useRef, useState } from "react";
import TextInput from "../../common/inputs/TextInput";
import Modal from "../../common/modals/Modal";
import Button from "../../common/Button";
import { renderErrorsAlertBox, schemaValidation } from "../../../utils";
import { postCategorySchema } from "../../../joi-schemas";

function AddPostCategory({ onCloseModal, onConfirm, onCancel }) {
  const [postCategoryName, setPostCategoryName] = useState("");
  const [errors, setErrors] = useState(null);

  const nameInputRef = useRef(null);

  function handleCancel() {
    setPostCategoryName("");
    onCancel();
  }

  // Validating the form
  function handleSubmit(e) {
    e.preventDefault();

    const newCategory = { name: postCategoryName };

    const validation = schemaValidation(postCategorySchema, newCategory);

    if (!validation.error) onConfirm(e, newCategory);
    else setErrors(validation.error.details);
  }

  // Focusing on input when modal opens
  useEffect(function () {
    nameInputRef.current.focus();
  }, []);

  return (
    <Modal title="Add post category" onCloseModal={onCloseModal}>
      {renderErrorsAlertBox(errors, "w-full")}
      <form onSubmit={handleSubmit}>
        <TextInput
          inputRef={nameInputRef}
          placeholder="Name"
          className="w-full mb-5"
          value={postCategoryName}
          onChange={(e) => setPostCategoryName(e.target.value)}
          clear
          onClear={() => setPostCategoryName("")}
        />

        <div className="flex justify-end">
          <Button
            onClick={handleCancel}
            color="red-600"
            hoverColor="red-700"
            className="mr-2"
          >
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddPostCategory;
