import React from 'react'
import './sidebarChat.css'
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
function SideBarChat({room}) {
   
    console.log(room.messages)
    return (
        <Link className='link' to={`/rooms/${room._id}`}>
            <div className='sidebarChat'>
                <Avatar src={room.img}/>
                <div className='sidebarChat__infos'>
                   <div className='sidebarChat__roomInfos'>
                        <h2>{room.name}</h2>
                        {room.messages.length> 0 &&  <p>{room.messages.slice(-1)[0].timestamp} </p>}
                   </div>
                    
                    {room.messages.length> 0 &&  <p>{room.messages.slice(-1)[0].message} </p>}
                   
                </div>
            </div>
        </Link>
       
    )
}

export default SideBarChat
