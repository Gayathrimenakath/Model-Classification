import axios from 'axios';
import React, { useCallback, useState, useEffect,useRef  } from "react";

// import update from "immutability-helper";
import cuid from "cuid";
import ImageList from "./ImageList";


import ScoreTable from "./ScoreTable";
// Import the dropzone component
import Dropzone from "./Dropzone";

// import ImageList from "./ImageList";
import Prediction from "./Prediction";

import "./App.css";




function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const isInitialMount = useRef(true);

  const [prediction, setPrediction] = useState([]);
  const [uploaded, setUploaded] = useState(false)
  
  const [images, setImages] = useState([]);
  const [scores, setScores] = useState({
    correct:0,
    wrong:0,
    notAnnounced: 0,
    total:0});

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

  // const moveImage = (dragIndex, hoverIndex) => {
  //   const draggedImage = images[dragIndex];
  //   setImages(
  //     update(images, {
  //       $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
  //     })
  //   );
  // };

  useEffect(() => {
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    submitForm();
   }
 },[])

  const submitForm = (event) => {
    var formData = new FormData();
    formData.append("data", selectedFile);
    
    let config={
      headers: {'Content-Type' : 'image/jpg'}
    }
    axios
      .post('http://54.194.131.169:8080/predictions/densenet161', formData, config)
      .then(function (response) {
        //console.log(response);
        console.log('scoreeeeeee',scores)

        if (response.status === 200)
            setPrediction(response.data)
            setUploaded(true)

    })
    .catch(function (error) {
        console.log(error);
    });
      
      
  };

  const clearState = () =>{
    setImages([])
      setUploaded(false)
      setSelectedFile([])
      setPrediction([])
    
  };

  
      
   

     //console.log('llllllllllllllllllllll',prediction)


  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  return (
    <main className="App">
      <h1 className="text-center">DenseNet Image Classification Example</h1>
    

      {(!uploaded) ? <Dropzone onDrop={onDrop} accept={"image/*"} value={selectedFile}/>: 
      <ImageList images={images}  />}
       
       
        {((scores.correct !== 0) || (scores.wrong !== 0) ) && (
         <ScoreTable score={scores} />
      )}
      
     
     

      {/* {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )} */}
      {/* <DndProvider backend={backendForDND}> */}
        {/* <ImageList images={images}  moveImage={moveImage}  /> */}
      <span>&nbsp;</span>
        {(prediction.length ===  0) ?
         <button className ="submit" disabled = {!selectedFile} onClick={submitForm}>Submit</button>:
       
          <Prediction prediction={prediction} clearState={clearState} changeScore = {setScores} score={scores}/>
         
        }
      {/* </DndProvider> */}
     
      
         
       
    </main>
  );
}

export default App;

// onChange={setPrediction} onAnswer={setUploaded}  changeImage={setImages} 