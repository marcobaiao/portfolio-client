import { useRef } from "react";

function FileInput({ labelText, name, onChange, multiple = false, accept }) {
  const fileInputRef = useRef();

  function handleOpenFileDialog() {
    fileInputRef.current.click();
  }

  return (
    <>
      <label
        className="bg-gray-100 w-fit px-3 py-0.5 border border-1 border-gray-500 rounded-sm hover:bg-gray-200"
        onClick={handleOpenFileDialog}
      >
        {labelText}
      </label>

      <input
        ref={fileInputRef}
        className="hidden"
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        multiple={multiple}
      />
    </>
  );
}

export default FileInput;
