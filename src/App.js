 
import './App.css';
import Login from "./login"
import { Routes, Route} from "react-router-dom";
import Register from './register';
import { useState } from 'react';
import { user as userDetails} from './dataDetails'
import UserInfo from './userInfo';

function App() {

const [user,setUser] = useState(userDetails())


  return (
    <div className="App"> 
      <Routes>
          <Route path="/" element={<Login  user={user} setUser={setUser}/>} />
          <Route index element={<Login  user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login  user={user} setUser={setUser}/>} />
          <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="/userInfo" element={<UserInfo />} /> 

      </Routes>
    </div>
  );
}

export default App;
