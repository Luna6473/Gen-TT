import React from 'react'
import {BsFillTrashFill,BsFillPencilFill} from "react-icons/bs"
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return <div className='table-wrapper'>
    <table className='table'>
        <thead>
            <tr>
                <th>Time</th>
                <th className='expand'>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {
            rows.map((row, idx) => {
                

                return(
                    <tr key={idx}>
                    <td>{row.time}</td>
                    <td className='expand'>{row.description}</td>
                    <td>
                    <span className='actions'>
                        <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
                        <BsFillPencilFill onClick={() => editRow(idx)} />
                    </span>
                </td>
                </tr>
                );
            })
        }

        </tbody>
    </table>
  </div>
}
