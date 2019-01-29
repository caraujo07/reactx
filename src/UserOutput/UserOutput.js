import React from 'react';
import "./UserOutput.css";

const userOut = (props) => {
  return (
    <div className="userOut">
      <p>Username: {props.userName}</p>
      <p>I use {props.userName} for many accounts</p>
    </div> 
  )
};

export default userOut;