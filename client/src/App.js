import React, {useState, useEffect } from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css'
import Chat from './components/ChatW/Chat'
import Sidebar from './components/Sidebar/SideBar'
//import Join from './components/Join/Join'
import Pusher from 'pusher-js'
import axios from './axios'
import Login from "./components/Authentication/Login";
function App() {
  const [messages,setMessages]= useState([])
  const [user,setUser]= useState(null)
  
  useEffect(()=>{
    axios.get('/messages').then(res=> {console.log(res.data);
      setMessages(res.data)
    } ).catch(err=> console.log(err))
  },[])

  useEffect(()=>{
    const pusher = new Pusher('97afa67d358853afcd93', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
     
      setMessages([...messages, data])
      console.log(messages)
    });

   return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[messages])
  return (
    <div className="App">
      {user ? (<Login/>)
      :
      <div className="app__body">
        <Router>
          <Sidebar/>
          <Switch>
         
            <Route path='/rooms/:roomId'>
              
              <Chat messages={messages}/>
            </Route>
            <Route path='/'>
              
            </Route>
            
          </Switch>
        </Router>
       
      </div>}
      
    </div>
  );
}

export default App;
