import { useState } from "react";
import { init } from "../../config/tinymceConfig";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

function Editor({ initialValue, onSetContent }) {
  const [isEditorLoading, setIsEditorLoading] = useState(true);

  function handleEditorChange(e) {
    onSetContent(e.target.getContent());
  }

  return (
    <>
      {isEditorLoading && <p>Loading...</p>}

      <TinyMCEEditor
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        init={init}
        initialValue={initialValue}
        onChange={handleEditorChange}
        onInit={() => setIsEditorLoading(false)}
      />
    </>
  );
}

export default Editor;
