import React from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";

function FileUpload({ open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});
  const files = acceptedFiles.map((file) =>(
    <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (<p className="dropzone-content">
                    Release to drop files
                </p>
                ) : (
                <p className="dropzone-content">
                    Drag and drop files here or click to select fiiles
                </p>
                )}
                <button type="button" onClick={open} className="btn">
                    Click to select files
                </button>
            </div>    
        </div>
        <aside>
            <ul>{files}</ul>
        </aside>
    </div>
    
  );
}

export default FileUpload;