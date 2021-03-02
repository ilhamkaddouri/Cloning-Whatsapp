import { Avatar } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import './Chat.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios'
import {useParams} from 'react-router-dom'
function Chat({messages}) {
    const [input,setInput]= useState()
    const {roomId} =useParams()
    const [roomName,setRoomName]= useState()
    const [roomImg,setRoomImg]= useState()
    const sendMessage =async (e)=>{
        e.preventDefault()
        await axios.post('/messages',{
            message : input,
            name:"user",
            timestamp : new Date().toUTCString(),
            received: false
        });
        setInput("")
    }

    useEffect(()=>{
        if(roomId){
            axios.get(`/rooms/${roomId}`).then(res=>{
                console.log(res.data)
                setRoomName(res.data.name);
                setRoomImg(res.data.img)
            }).catch(err=> console.log(err))
        }
      
    },[roomId])

    return (
        <div className='chat'>
           <div className='chat__header'>
                <Avatar src={roomImg}/>
                <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>lat seen on..</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
           </div>
           <div className="chat__body">
               {messages.map((key,message)=>(
                     <p id={key} className={`chat__message ${message.received && "chat__receiver"} `}>
                     <span className="chat__name">{message.name}</span>
                     {message.message}
                     <span className='chat__timestamp'>{message.timestamp}</span>
                     
                 </p>
               ))}
              
                
           </div>
           <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={(event)=> setInput(event.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <MicIcon/>
           </div>
        </div>
    )
}

export default Chat
