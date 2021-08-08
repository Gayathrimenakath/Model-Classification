import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./ScoreTable.css";

function ScoreTable({score}) {
   var ga =  (((score.correct*score.cLoss) + (score.wrong*score.wLoss)) / (score.correct+score.wrong)).toFixed(2)
   
    const items = [{
        row: 'check',
        column: 'C.A',
        value: score.correct,
      },
      {
        row: 'check',
        column: 'A:E',
        value: score.cLoss,
      },
      {
        row: 'times',
        column: 'C.A',
        value: score.wrong,
      },
      {
        row: 'times',
        column: 'A:E',
        value: score.wLoss,
      },
      {
        row: 'NA',
        column: 'C.A',
        value: score.notAnnounced,
      },
      {
        row: 'NA',
        column: 'A:E',
        value: '-',
      },
      {
        row: '# | G.A',
        column: 'C.A',
        value: score.total,
      },
      {
        row: '# | G.A',
        column: 'A:E',
        value: parseFloat(ga),
      }
    ];
    const groupBy = (objectArray, property) => {
        return objectArray.reduce(function(acc, obj) {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }
    
    const groupedItems = groupBy(items, 'row');
    return (
    <div className="table">
        <table>
            <thead>
            <tr>
                <th></th>
                <th scope="col">C.A</th>
                <th scope="col">A.E</th>
            </tr>
            </thead>
            
            <tbody>
            {Object.keys(groupedItems).map(row => (
            <tr>
                <td> {(row === 'times' || row === 'check')? <FontAwesomeIcon icon={row}  className={row}/>: <p className={row}>{row}</p>} </td>
                {groupedItems[row].map(item => (
                <td>{item.value}</td>
                ))}
           </tr>
           ))}
            </tbody>
            
        </table>
    </div> 
  )
}

export default ScoreTable