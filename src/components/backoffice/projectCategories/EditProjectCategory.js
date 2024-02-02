import { useEffect, useRef, useState } from "react";
import TextInput from "../../common/inputs/TextInput";
import Button from "../../common/Button";
import Modal from "../../common/modals/Modal";
import { renderErrorsAlertBox, schemaValidation } from "../../../utils";
import { projectCategorySchema } from "../../../joi-schemas";

function EditProjectCategory({
  onCloseModal,
  onConfirm,
  onCancel,
  selectedProjectCategory,
  onInputChange,
}) {
  const nameInputRef = useRef(null);
  const [errors, setErrors] = useState(null);

  // Validating the form
  function handleSubmit(e) {
    e.preventDefault();

    const editedCategory = {
      name: selectedProjectCategory.name,
    };

    const validation = schemaValidation(projectCategorySchema, editedCategory);

    if (!validation.error) {
      onConfirm(e, editedCategory);
    } else {
      setErrors(validation.error.details);
    }
  }

  // Focusing on the input when modal opens
  useEffect(function () {
    nameInputRef.current.focus();
  }, []);

  return (
    <Modal title="Edit project category" onCloseModal={onCloseModal}>
      {renderErrorsAlertBox(errors, "w-full")}

      <form onSubmit={handleSubmit}>
        <TextInput
          inputRef={nameInputRef}
          placeholder="Name"
          className="w-full mb-5"
          value={selectedProjectCategory.name}
          onChange={onInputChange}
        />

        <div className="flex justify-end">
          <Button
            onClick={onCancel}
            color="red-700"
            hoverColor="red-800"
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

export default EditProjectCategory;
