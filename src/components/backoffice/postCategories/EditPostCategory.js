import { useEffect, useRef, useState } from "react";
import TextInput from "../../common/inputs/TextInput";
import Button from "../../common/Button";
import Modal from "../../common/modals/Modal";
import { renderErrorsAlertBox, schemaValidation } from "../../../utils";
import { postCategorySchema } from "../../../joi-schemas";

function EditPostCategory({
  onCloseModal,
  onConfirm,
  onCancel,
  selectedPostCategory,
  onInputChange,
}) {
  const [errors, setErrors] = useState(null);

  const nameInputRef = useRef(null);

  // Validating the form
  function handleSubmit(e) {
    e.preventDefault();

    const editedCategory = {
      name: selectedPostCategory.name,
    };

    const validation = schemaValidation(postCategorySchema, editedCategory);

    if (!validation.error) {
      onConfirm(e, editedCategory);
    } else {
      setErrors(validation.error.details);
    }
  }

  // Focusing on the input when the modal loads
  useEffect(function () {
    nameInputRef.current.focus();
  }, []);

  return (
    <Modal title="Edit post category" onCloseModal={onCloseModal}>
      {renderErrorsAlertBox(errors, "w-full")}
      <form onSubmit={handleSubmit}>
        <TextInput
          inputRef={nameInputRef}
          placeholder="Name"
          className="w-full mb-5"
          value={selectedPostCategory.name}
          onChange={onInputChange}
        />

        <div className="flex justify-end">
          <Button
            onClick={onCancel}
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

export default EditPostCategory;
