import axios from 'axios';
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend }  from "react-dnd-html5-backend";
import update from "immutability-helper";
import cuid from "cuid";


// Import the dropzone component
import Dropzone from "./Dropzone";

import ImageList from "./ImageList";

import "./App.css";

const backendForDND = HTML5Backend;


function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      setSelectedFile(acceptedFiles[0])

      const reader = new FileReader();
      reader.onload = function(e) {
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      
      reader.readAsDataURL(file);

      return file;
    });
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  const submitForm = (event) => {
    var formData = new FormData();
    formData.append("data", selectedFile);
    
    let config={
      headers: {'Content-Type' : 'image/jpg'}
  }

    axios
      .post('http://54.194.131.169:8080/predictions/densenet161', formData, config)
      .then((res) => {
        alert("File Upload success");
        console.log(res)
      })
      .catch((err) => alert("File Upload Error"))
      
      event.preventDefault();

  };


  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <div >
      <Dropzone onDrop={onDrop} accept={"image/*"} value={selectedFile}/>
      
      <button disabled = {!images} onClick={submitForm}>Submit</button>
      </div>

      {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <DndProvider backend={backendForDND}>
        <ImageList images={images}  moveImage={moveImage}  />
      </DndProvider>
    </main>
  );
}

export default App;
