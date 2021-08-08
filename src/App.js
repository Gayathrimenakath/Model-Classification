import axios from 'axios';
import React, { useCallback, useState, useEffect,useRef  } from "react";
import cuid from "cuid";

import ImageList from "./ImageList";
import ScoreTable from "./ScoreTable";
import Dropzone from "./Dropzone";
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
    total:0,
    cLoss:0,
    wLoss:0,
    genAvg:0});

  //get the file uploaded by the user
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      setSelectedFile(acceptedFiles[0])
      setUploaded(true)

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


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    submitForm();
   }
 },[])

  //send a POST request with the uploaded image
  const submitForm = (event) => {
    var formData = new FormData();
    formData.append("data", selectedFile);
    
    let config={
      headers: {'Content-Type' : 'image/*'}
    }
    axios
      .post('http://54.194.131.169:8080/predictions/densenet161', formData, config)
      .then(function (response) {
        if (response.status === 200){
          setPrediction(response.data)
        }         
    })
    .catch(function (error) {
        console.log(error);
    });

    event.preventDefault();
  };


  //clear the state and set it to initial state
  const clearState = () =>{
    setImages([])
    setUploaded(false)
    setSelectedFile([])
    setPrediction([])
  };


  return (
    <main className="App">
      <h1 className="text-center">DenseNet Image Classification Example</h1>

      <div id="container">
        <div id="left">
          {(scores.total !== 0)  && (
          <ScoreTable score={scores} />
          )}
        </div>
        <div id="right">
          {(!uploaded) ? <Dropzone onDrop={onDrop} accept={"image/*"} value={selectedFile}/>: 
          <ImageList images={images} />}
        </div>
      </div>
     
      <span>&nbsp;</span>
      {(prediction.length ===  0) ?
        <button className ="submit" disabled = {!uploaded} onClick={submitForm}>Submit</button>:
        <Prediction prediction={prediction} clearState={clearState} changeScore = {setScores} score={scores}/>
      }  
    </main>
  );
}

export default App;
