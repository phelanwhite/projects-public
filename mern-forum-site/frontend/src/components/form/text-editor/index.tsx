import React, { FC } from "react";
import ReactQuill, { type ReactQuillProps } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./style.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const TextEditor: FC<ReactQuillProps> = ({ ...props }) => {
  return (
    <React.Fragment>
      <ReactQuill
        {...props}
        id="ReactQuill"
        modules={{
          toolbar: toolbarOptions,
        }}
        theme="snow"
      />
    </React.Fragment>
  );
};

export default TextEditor;
