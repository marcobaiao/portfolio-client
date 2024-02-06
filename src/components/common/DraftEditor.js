import { Editor as RDEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Editor({ editorState, onEditorStateChange, onContentStateChange }) {
  return (
    <RDEditor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      onContentStateChange={onContentStateChange}
    />
  );
}

export default Editor;
