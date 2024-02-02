import { useEffect, useRef, useState } from "react";
import TextInput from "../../common/inputs/TextInput";
import Button from "../../common/Button";
import Modal from "../../common/modals/Modal";
import { projectCategorySchema } from "../../../joi-schemas";
import { renderErrorsAlertBox, schemaValidation } from "../../../utils";

function AddProjectCategory({ onCloseModal, onConfirm, onCancel }) {
  const [projectCategoryName, setProjectCategoryName] = useState("");
  const [errors, setErrors] = useState(null);

  const nameInputRef = useRef(null);

  function handleCancel() {
    setProjectCategoryName("");
    onCancel();
  }

  // Validating form
  function handleSubmit(e) {
    e.preventDefault();

    const newCategory = { name: projectCategoryName };

    const validation = schemaValidation(projectCategorySchema, newCategory);

    if (!validation.error) onConfirm(e, newCategory);
    else setErrors(validation.error.details);
  }

  // Focusing on input when modal opens
  useEffect(function () {
    nameInputRef.current.focus();
  }, []);

  return (
    <Modal title="Add project category" onCloseModal={onCloseModal}>
      {renderErrorsAlertBox(errors, "w-full")}

      <form onSubmit={handleSubmit}>
        <TextInput
          inputRef={nameInputRef}
          name="name"
          placeholder="Name"
          className="w-full mb-5"
          value={projectCategoryName}
          onChange={(e) => setProjectCategoryName(e.target.value)}
          clear
          onClear={() => setProjectCategoryName("")}
        />

        <div className="flex justify-end">
          <Button
            color="red-700"
            hoverColor="red-800"
            onClick={handleCancel}
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

export default AddProjectCategory;
