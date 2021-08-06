import React from "react";

import "./Prediction.css";

const Prediction = ({ prediction, clearState, changeScore, score }) => {

    var correctAnswer = Object.keys(prediction).reduce((a, b) => prediction[a] > prediction[b] ? a : b)
    console.log('maximum',correctAnswer)

    const calcScore = (event) => {
        if (event.target.value  === correctAnswer ){     
            changeScore((prevState) => ({
                ...prevState,
                correct: score.correct + 1,
                total: score.total +1,
                cLoss: score.cLoss+ parseFloat((-(1)*Math.log(prediction[correctAnswer] )).toFixed(2)),
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
              }));
        }
        
        clearState()

    }


  return (
   
    <div className="text-center">
   
    {prediction && (
      <div className="predict">
        {Object.keys(prediction).map(function(keyName, keyIndex) {
    		return (
                <div className = 'rowC' key={keyName}>
                    <div>
                        <svg width="150" height="100" key={keyName}>
                            <rect x="0" y="0" width="150" height="100"   fill="black"/>
                            <text x="50%" y="50%"   fill="#7d7d7d"color= "whitesmoke" > {keyName}</text> 
                            <text x="30%" y="30%"  fill="whitesmoke" >{(prediction[keyName]*100).toFixed(0)}</text>
                        </svg>
                    </div>
                    <button className ="answer" onClick={calcScore} value = {keyName} fill="yellowgreen" >Correct answer</button>
                </div> 
    		)
		})}
        <span>&nbsp;</span>
        <div>
            <span>&nbsp;</span>
            <button className ="na" onClick={calcScore} value={'NA'}>None of the above</button>
        </div>
      </div>
    )} 
    </div>
 
        )}

export default Prediction;