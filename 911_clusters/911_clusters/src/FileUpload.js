import React, {useState} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";
import axios from 'axios';

function FileUpload({ open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});
  const files_all = acceptedFiles.map((file) =>(
    <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
  ));
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleMultipleChange(event) {
    setFiles([...event.target.files]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFiles';
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }  
  return (
    <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
            <input className="input-zone" {...getInputProps()} onChange={handleMultipleChange} />
            <div className="text-center">
                {isDragActive ? (<p className="dropzone-content">
                    Release to drop files
                </p>
                ) : (
                <p className="dropzone-content">
                    Drag and drop ALL files here or click to select files 
                </p>
                )}
                <button type="button" onClick={open} className="btn" onChange={handleMultipleChange}>
                    Click to select files
                </button>
            </div>
            <button type='button' className="bttn" onSubmit={handleMultipleSubmit}>
                Submit
            </button>  
        </div>
        {uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))}
        <aside>
            <ul>{files_all}</ul>
        </aside>
    </div>
    
  );
}

export default FileUpload;