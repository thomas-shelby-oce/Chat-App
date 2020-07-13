import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'
import './Chat.css';
import React,{useState,useEffect} from 'react';
import queryString from 'query-string';//used to read data from url
import io from 'socket.io-client';

let socket;




const Chat=(props)=>{
  const [name,setName]=useState('');
  const [room,setRoom]=useState('');
  const [message,setMessage]=useState('');
  const [messages,setMessages]=useState([]);
  const ENDPOINT='localhost:5000'
  useEffect(()=>{
     const {name,room}=queryString.parse(props.location.search)//location prop passed by router
     socket=io(ENDPOINT);
     setName(name);
     setRoom(room);
     socket.emit('join',{name:name,room:room},()=>{

     });
     //when we unmount
     return()=>{
       socket.emit('disconnect');
       socket.off();
     }
  },[ENDPOINT,props.location.search]);
  useEffect(()=>{
    socket.on('message',(message)=>{
       setMessages([...messages,message]);
    },[messages]);
  })
  const sendMessages=(event)=>{
    event.preventDefault();
    if(message)
    {
      socket.emit('sendMessage',message,()=>setMessage(''));
    }
  };
  console.log(message,messages);
  return(
    <div className="outerContainer">
     <div className="container">
      <InfoBar room={room}/>
      <Messages messages={messages} name={name}/>
      <Input message={message} sendMessages={sendMessages} setMessage={setMessage}/>

     </div>
    </div>
  )
}

export default Chat;
