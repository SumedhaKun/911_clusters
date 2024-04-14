import React, {useState, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";
import axios from 'axios';
import './FileUpload.css';

function FileUpload({ open }) {
  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});
  //const {acceptedFiles} =useDropzone({});
//   const files_all = acceptedFiles.map((file) =>(
//     <li key={file.path}>
//         {file.path} - {file.size} bytes
//     </li>
//   ));
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleMultipleChange(event) {
    setFiles([...event.target.files]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
    };

    console.log("got here");
    console.log(files)
    formData.append('file',files[0])

    console.log(formData.get('file'))

    var formData2=new FormData()
    formData2.append('file',files[0])
    console.log(...formData)
    //const [imageData, setImageData] = useState('');

    axios.post('http://localhost:8000/post/',formData,config)
      .then((response) => {
        console.log(response.data);
        console.log(response);
        const data = response.json();
        //setImageData(data);

      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
        console.log(error.response)
      });

  }  
  return (
    <div className="container" >
        <form onSubmit={handleMultipleSubmit}>
            <h1>Drag and drop ALL cases here</h1>
            <input type="file" multiple onChange={handleMultipleChange} className="btn"/>
            <button type="Submit" className="btn">Upload</button>
        </form>
        {uploadedFiles && uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))}
      {/* <div>
        {imageData && (
            <img 
                src={`data:image/png;base64,${imageData}`}
                alt='API Image'
                />
        )}
      </div> */}
        {/* <aside>
            <ul>{files_all}</ul>
        </aside> */}
        {/* <div {...getRootProps({ className: "dropzone" })}>
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
        </div> */}
    </div>
    
  );
}

export default FileUpload;