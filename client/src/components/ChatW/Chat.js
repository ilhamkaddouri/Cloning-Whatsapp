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
import Pusher from 'pusher-js'
import {useParams} from 'react-router-dom'
import Picker from 'emoji-picker-react';
function Chat() {
    const [messages,setMessages]= useState([])
    const [input,setInput]= useState()
    const {roomId} =useParams()
    const [roomName,setRoomName]= useState()
    const [timseStamp,setTimeStamp]= useState()
    const [roomImg,setRoomImg]= useState()
    const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

    const sendMessage =async (e)=>{
        e.preventDefault()
        await axios.post(`/rooms/${roomId}/messages`,{
            message : input,
            name:"user",
            timestamp : new Date().toUTCString(),
            received: false
        });
        setInput("")
    }

    useEffect(()=>{
        const pusher = new Pusher('97afa67d358853afcd93', {
        cluster: 'eu'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
        
        setMessages([...messages, data])
       
    });

    return ()=>{
        channel.unbind_all()
        channel.unsubscribe();
    }
    },[messages])
    
    useEffect(()=>{
        if(roomId){
            axios.get(`/rooms/${roomId}`).then(res=>{
                setRoomName(res.data.name);
                setRoomImg(res.data.img)
                
                setMessages(res.data.messages)
            }).catch(err=> console.log(err))
        }
        if(messages.length>0){
            setTimeStamp(messages.slice(-1)[0].timestamp)
        }
       
    },[roomId])
    
    return (
        <div className='chat'>
           <div className='chat__header'>
                <Avatar src={roomImg}/>
                <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>lat seen on {messages.length>0 && <span className="chat__lastseen">{timseStamp}</span>}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton >
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
               {messages.map((message,key)=>(
                     <p className={`chat__message ${message.received && "chat__receiver"} `}>
                     <span className="chat__name">{message.name}</span>
                     {message.message}
                     <span className='chat__timestamp'>{message.timestamp}</span>
                     
                 </p>
               ))}
              
                
           </div>
           <div className="chat__footer">
               <IconButton>
                    <InsertEmoticonIcon/>
               </IconButton>
                <form>
                    <input value={input} onChange={(event)=> setInput(event.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
           </div>
        </div>
    )
}

export default Chat
