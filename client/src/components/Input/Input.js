import React from 'react';
import './Input.css';

const Input=({message,sendMessages,setMessage})=>{
  return(
   <form className='form'>
   <input
     className="input"
     type="text"
     placeholder="Type a message..."
     value={message}
     onChange={(event)=>setMessage(event.target.value)}
     onKeyPress={(event)=>event.key==='Enter'?sendMessages(event):null}
   />
   <button className="sendButton"
   onClick={(event)=>sendMessages(event)}>
    Send
   </button>
   </form>
  )

};

export default Input;
