import React from "react";

import "./Prediction.css";

const Prediction = ({ prediction, clearState, changeScore, score }) => {
  
  //Get the correct answer based on the key with the highest value
  var correctAnswer = Object.keys(prediction).reduce((a, b) => prediction[a] > prediction[b] ? a : b)
  console.log('maximum',correctAnswer)

  var i = -1
  var target = new Array(4).fill(0);


    //store the predicted scores in a variable by converting them to percentage with no decimal value
    var predictedScore =JSON.parse(JSON.stringify(prediction));
    for (var key in predictedScore) {
      if (predictedScore.hasOwnProperty(key)) {
        predictedScore[key] = (predictedScore[key]*100).toFixed(0);
      }
    }
   
    
    //add classname to the text to show color codes for scores
    function textClass (keyName){
      if (predictedScore[keyName]>50){
        return 'text-green'
      }
      else if (predictedScore[keyName]>25){
        return 'text-lightgreen'
      }
      else{
        return 'text-red'
      }
    }

    //calculate the loss function
    function calcLoss(target){
      var i = 0;
      var loss = 0;
      for (var key in prediction) {
        loss += (-(target[i]*Math.log(prediction[key]))).toFixed(2);
        i++
      }
      return parseFloat(loss)
    }


    //calculate scores based on the answer chosen by the user
    const calcScore = (event) => {
      target[event.target.id] = 1
      target.join()

        if (event.target.value  === correctAnswer ){     
            changeScore((prevState) => ({
                ...prevState,
                correct: score.correct + 1,
                total: score.total +1,
                cLoss: score.cLoss+ calcLoss(target),
              }));
        }
        else if (event.target.value  === 'NA' ){
            changeScore((prevState) => ({
                ...prevState,
                notAnnounced: score.notAnnounced + 1,
                total: score.total +1,
              }));
        }
        else{
            changeScore((prevState) => ({
                ...prevState,
                wrong: score.wrong+1,
                total: score.total +1,
                wLoss: score.wLoss+ calcLoss(target),
              }));
        }
        
        clearState()

    }


  return (
   
    <div className="text-center">
   
    {prediction && (
      <div className="predict">
        {Object.keys(prediction).map(function(keyName, keyIndex) {
          i++
    		return (
                <div className = 'rowC' key={keyName}>
                    <div>
                        <svg width="150" height="100" key={keyName}>
                            <rect x="0" y="0" width="150" height="100" fill="black"/>
                            <text className={textClass(keyName)} x="50%" y="40%"  fontSize="16" fontWeight="bold" textAnchor="middle" >{predictedScore[keyName]}</text>
                            <text x="50%" y="80%" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" > {keyName}</text> 
                        </svg>
                    </div>
                    <button className ="answer" onClick={calcScore} id={i} value = {keyName} fill="yellowgreen" >Correct answer</button>
                </div> 
    		)
        
		})}
        <span>&nbsp;</span>
        <div>
            <span>&nbsp; </span>
            <button className ="na" onClick={calcScore} value={'NA'}>None of the above!</button>
        </div>
      </div>
    )} 
    </div>
 
  )}

export default Prediction;