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
    cLoss:0});

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
        if (response.status === 200){
          var predictedScore = response.data
          for (var key in predictedScore) {
            if (predictedScore.hasOwnProperty(key)) {
              predictedScore[key] = (predictedScore[key]*100).toFixed(0);
            }
          }
          setPrediction(predictedScore)
            setUploaded(true)
        }

            
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


  return (
    <main className="App">
      <h1 className="text-center">DenseNet Image Classification Example</h1>

      {(!uploaded) ? <Dropzone onDrop={onDrop} accept={"image/*"} value={selectedFile}/>: 
      <ImageList images={images}  />}
       
       
        {((scores.correct !== 0) || (scores.wrong !== 0) ) && (
         <ScoreTable score={scores} />
      )}
      
      <span>&nbsp;</span>
        {(prediction.length ===  0) ?
         <button className ="submit" disabled = {!selectedFile} onClick={submitForm}>Submit</button>:
          <Prediction prediction={prediction} clearState={clearState} changeScore = {setScores} score={scores}/>
        }
   
       
    </main>
  );
}

export default App;
