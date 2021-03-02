import React from 'react'
import './sidebarChat.css'
import {Avatar, IconButton} from '@material-ui/core'
function SideBarChat() {
    return (
        <div className='sidebarChat'>
            <Avatar/>
            <div className='sidebarChat__infos'>
                <h2>Room name</h2>
                <p>Ths is the last message</p>
            </div>
        </div>
    )
}

export default SideBarChat
