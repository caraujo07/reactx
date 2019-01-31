import React from 'react';
import "./UserInput.css";

const userIn = (props) => {
 
  return (
    <div className="userIn">
      <h1>React: First Assignment</h1>
      <label>Username:</label>
      <input type="text" 
             onChange={props.changed} 
             value={props.currentName}
             />
    </div> 
  )
};

export default userIn;