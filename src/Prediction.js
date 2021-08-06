import React from "react";

import "./Prediction.css";

const Prediction = ({ prediction, clearState, changeScore, score }) => {

    //console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',prediction)
    var correctAnswer = Object.keys(prediction).reduce((a, b) => prediction[a] > prediction[b] ? a : b)
    console.log('maximum',correctAnswer)

    const calcScore = (event) => {
        if (correctAnswer === event.target.value ){
            console.log('correct answer', event.target.value)
            changeScore((prevState) => ({
                ...prevState,
                correct: score.correct + 1,
              }));
        }
        else{
            console.log('wrong answer' )
            changeScore((prevState) => ({
                ...prevState,
                wrong: score.wrong+1,
              }));
        }
        
        clearState()
        console.log('scoreeeeeee',score)

    }


  return (

    
                <div >
      
      <div className="text-center">
     {/* display books from the API */}
    {prediction && (
      <div className="books">

        {/* loop over the books */}
        {Object.keys(prediction).map(function(keyName, keyIndex) {
           
    		return (

                <div className = 'rowC'>
                    <div>
                    <svg width="150" height="100" key={keyName}>
                    <rect x="0" y="0" width="150" height="100"   fill="black"/>
                    <text x="50%" y="50%"  text-anchor="middle" fill="#7d7d7d"color= "whitesmoke" font-weight= "bold"> {keyName}</text> 
                    <text x="30%" y="30%" text-anchor="middle" fill="whitesmoke" font-weight= "bold">{(prediction[keyName]*100).toFixed(0)}</text>
                </svg>
                </div>

                <button className ="answer" onClick={calcScore} value = {keyName} fill="yellowgreen" >Correct answer</button>

                {/* <svg width="150" height="50" key='{keyName}+1'>
                    <rect x="0" y="0" width="150" height="100"  stroke-width="3px" fill="yellowgreen"/>
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color = "whitesmoke"> Correct answer</text> 
                    
                </svg> */}
                </div> 

      		
    		)
		})}
        <span>&nbsp;</span>
        <div>
        <span>&nbsp;</span>
      <button className ="answer" onClick={calcScore} >None of the above</button>
      </div>

      </div>
      
    )}
        
      </div>
      
      
    </div>
        )
        }
        
        // const Print = props => {
        //     return (
        //             <Avatar>{props.data}</Avatar>  //Avatar is a component imported from materialUI
        //     )
        // }

//     <div >
//       <input className="prediction-output" />
//       <div className="text-center">
//      {/* display books from the API */}
//     {prediction && (
//       <div className="books">

//         {/* loop over the books */}
//         {Object.keys(prediction).map(function(keyName, keyIndex) {
//     		return (
//       			<p key={keyName}>
// 					{keyName}
//                     {prediction[keyName]}
//                     {console.log(prediction[keyName])}
//           		</p>
//     		)
// 		})}

//       </div>
//     )}
        
//       </div>
//     </div>
//   );
// };

export default Prediction;