import React,{useState, useEffect} from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css'
import SideBarChat from './SideBarChat';
import axios from '../../axios'
function SideBar() {

    const [rooms,setRooms]= useState([])

    useEffect( ()=>{
        const unsubscribe= axios.get('/rooms').then(res=> {
            console.log(res.data);
            setRooms(res.data)
        }).catch(err=> alert(err+"occured"))

        return ()=>{
            unsubscribe()
        }
    },[])

    const createChat = ()=>{
        const name = prompt("please enter name")
        if(name){
            const room= {name}
            axios.post('/rooms',room).then(res=> console.log(res.data)).catch(err=> console.log(err))
        }
    }

    return (
        <div className="Sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton onClick={createChat}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                {rooms.map((room, key)=>(
                    <SideBarChat key={key} room={room} />
                ))}
                
               
            </div>
        </div>
    )
}

export default SideBar
