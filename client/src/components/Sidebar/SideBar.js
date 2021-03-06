import React,{useState, useEffect} from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Sidebar.css'
import SideBarChat from './SideBarChat';
import axios from '../../axios'
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'relative',
      width: 300,
      backgroundColor: "#ffffff",

      border: '2px solid #000',
      padding: theme.spacing(2, 4, 3),
    },
  }));
function SideBar() {

    const [rooms,setRooms]= useState([])
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [name,setName] = useState(" ")
    const [image,setImage] = useState(null)
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect( ()=>{
        const unsubscribe= axios.get('/rooms').then(res=> {
            console.log(res.data);
            setRooms(res.data)
        }).catch(err=> alert(err+"occured"))

        return ()=>{
            unsubscribe()
        }
    },[])

    const createChat = (e)=>{
        e.preventDefault()
        const user = 'user'
        const data = new FormData()
        data.append("name", name)
        data.append("image", image)
        data.append('img', image.name)
        try{
            const room ={name,image}
            console.log("image url is" +image.name)
            console.log("name is " +name)
            // if(name){
            //     const room= {name}
                axios.post('/rooms',data,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(res=> console.log(res.data)).catch(err=> console.log(err))
             
        }catch(err){
            console.log(err)
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
                    <div>
                        <IconButton onClick={handleOpen}>
                            <ChatIcon/>
                        </IconButton>
                        <Modal
                            style={modalStyle} className={classes.paper}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                           <form className="modal__form">
                               <input value={name} type="text" onChange={e=>setName(e.target.value)} placeholder="room name"/>
                               <input type="file" onChange={e=>setImage(e.target.files[0])} />
                               <button onClick={createChat} type="submit">Add a Room</button>
                           </form>
                        </Modal>
                    </div>
                   
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
