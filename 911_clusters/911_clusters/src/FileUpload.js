import React, {useState, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";
import axios from 'axios';
import './FileUpload.css';
//import ClusterImage from '/ClusterImage'
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";

function ImageComponent(props) {
    const [imageData, setImageData] = useState('');
    console.log("here: "+props.message);
    return (
        <div>
            {(
                <img 
                    src={`data:image/png;base64,${props.message}`}
                    alt='API Image'
                />
            )}
        </div>
    );
}
function FileUpload({ open }) {
  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});
  //const {acceptedFiles} =useDropzone({});
//   const files_all = acceptedFiles.map((file) =>(
//     <li key={file.path}>
//         {file.path} - {file.size} bytes
//     </li>
//   ));
  const [files, setFiles] = useState([]);
  const [apiData, setApiData]=useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [render, setRender]=useState(null);
  const [data,setData] = useState(null);
  //const history = useNavigate();

//   useEffect(() => {
//     fetchData().then((response) => {
//         setData(response.data);
//     }).catch((error) => {
//         console.error('Error fetching data', error)
//     });
//   }, [])

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
    
    console.log(files)

    axios.post('http://localhost:8000/post/',formData,config)
      .then((response) => {
        console.log(response.data);
        console.log(response);
        const data = response.data;
        setApiData(data)

      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
        console.log(error.response)
      });

      setRender(true)

    }

    return (
        <div className="overall" >
            <form onSubmit={handleMultipleSubmit}>
                <h2 className="text">drag and drop ALL cases here</h2>
                <input type="file" multiple onChange={handleMultipleChange} className="btn"/>
                <br/>
                <button type="Submit" className="btn" >Upload</button>
            </form>
            {uploadedFiles && uploadedFiles.map((file, index) => (
            <img key={index} src={file} alt={`Uploaded content ${index}`} />
          ))}
          <div className="overall">
            <h2>Clustered Cases</h2>
            {render && <ImageComponent message={apiData}/>}
            <a href="https://docs.google.com/document/d/1rEpcidKYKKsbXqPADYP_nnKkJpR_RYqCUWav__dOfq4/edit?usp=sharing">Learn More</a>
          </div>
          <div>
            {/* {imageData && (
                <img 
                    src={`data:image/png;base64,${imageData}`}
                    alt='API Image'
                    />
            )} */}
           </div>
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


export default FileUpload
