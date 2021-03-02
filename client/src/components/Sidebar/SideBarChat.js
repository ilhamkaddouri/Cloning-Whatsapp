import React from 'react'
import './sidebarChat.css'
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
function SideBarChat({room}) {
    return (
        <Link className='link' to={`/rooms/${room._id}`}>
            <div className='sidebarChat'>
                <Avatar src={room.img}/>
                <div className='sidebarChat__infos'>
                    <h2>{room.name}</h2>
                    <p>last message</p>
                </div>
            </div>
        </Link>
       
    )
}

export default SideBarChat
