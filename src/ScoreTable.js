import React from 'react';
import "./ScoreTable.css";

function ScoreTable({score}) {
    const items = [{
        row: 'Right',
        column: 'C.A',
        value: score.correct,
      },
      {
        row: 'Right',
        column: 'A:E',
        value: score.cLoss,
      },
      {
        row: 'Wrong',
        column: 'C.A',
        value: score.wrong,
      },
      {
        row: 'Wrong',
        column: 'A:E',
        value: 0,
      },
      {
        row: 'NA',
        column: 'C.A',
        value: score.notAnnounced,
      },
      {
        row: 'NA',
        column: 'A:E',
        value: 0,
      },
      {
        row: 'G.A',
        column: 'C.A',
        value: score.total,
      },
      {
        row: 'G.A',
        column: 'A:E',
        value: 0,
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
                <td>{row}</td>
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