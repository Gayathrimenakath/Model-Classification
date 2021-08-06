import React from 'react';
import "./ScoreTable.css";

function ScoreTable({score}) {



const items = [{
    item: 'Right',
    month: 'C.A',
    savings: score.correct,
  },
  {
    item: 'Right',
    month: 'A:E',
    savings: 0,
  },
  {
    item: 'Wrong',
    month: 'C.A',
    savings: score.wrong,
  },
  {
    item: 'Wrong',
    month: 'A:E',
    savings: 0,
  },
  {
    item: 'NA',
    month: 'C.A',
    savings: score.notAnnounced,
  },
  {
    item: 'NA',
    month: 'A:E',
    savings: 0,
  },
  {
    item: 'G.A',
    month: 'C.A',
    savings: score.total,
  },
  {
    item: 'G.A',
    month: 'A:E',
    savings: 0,
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

const groupedItems = groupBy(items, 'item');

  return (
      <div className="table">
<table>
      <tr>
        <th></th>
        <th scope="col">C.A</th>
        <th scope="col">A.E</th>
      </tr>
      {Object.keys(groupedItems).map(item => (
          <tr>
            <td>{item}</td>
              {groupedItems[item].map(item => (
                <td>{item.savings}</td>
              ))}
          </tr>
      ))}
    </table>
      </div>
    
  )
}


export default ScoreTable