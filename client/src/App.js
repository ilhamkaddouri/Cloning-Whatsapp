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
  const [user,setUser]= useState(null)

  return (
    <div className="App">
      {!user ? (<Login/>)
      :
      <div className="app__body">
        <Router>
          <Sidebar/>
          <Switch>
         
            <Route path='/rooms/:roomId'>
              
              <Chat />
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
