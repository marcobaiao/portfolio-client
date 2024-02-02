import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function CancelChangesModal({ onCancel, onConfirm }) {
  return (
    <Modal>
      <div className="p-6 pt-0 text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-orange-500 text-6xl"
        />

        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
          Are you sure you want to cancel the changes?
        </h3>
        <button
          onClick={onConfirm}
          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-7 py-2.5 text-center mr-2"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-7 py-2.5 text-center"
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default CancelChangesModal;
