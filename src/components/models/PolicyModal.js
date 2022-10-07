/* eslint-disable */
import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Editor } from "@tinymce/tinymce-react";

const PolicyModal = ({ show, onHide, handlePolicyEditorChange, initialVal }) => {
  const [editorContent, setEditorContent] = useState("");
  const saveChanges = () => {
    handlePolicyEditorChange(editorContent);
  };
  return (
    <Modal open={show} onClose={onHide} size="lg" center>
      <div className="model-box-view">
        <div className="modal-header"></div>
        <div className="model-body">
          <Editor
            apiKey="alzppk5y87xyqziy9mfltp1e63bg9jexd40he2sfraajyr1q"
            initialValue={initialVal ? initialVal : ""}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={setEditorContent}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              saveChanges();
              onHide();
            }}
          >
            Save
          </button>
          <button type="button" class="btn btn-secondary" onClick={onHide}>
            Discard
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PolicyModal;
