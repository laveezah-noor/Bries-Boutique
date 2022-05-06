import {useState, useEffect} from 'react';
import React from 'react'

function Table({data,head}) {
  const [List, setList] = useState([]);
  useEffect(() => {
      console.log(data)
      setList(data)
    
  });
  // console.log("List",List)
// console.log(head);
  return (
    <div>
      <h2 className='text-center'>{head}</h2>
      {List!==[]?
      <table className="table table-bordered border-primary">
          {List.map(item=>{return(
            <tr>
              {item.map(sub=>{return(
                <td className='p-2'>{sub}</td>
              )})}
            </tr>
          )})}
      </table>:null}
    </div>
  );
}

export default Table;

