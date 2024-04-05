import React, { useState , createContext} from 'react'
import './css/app.css'
import Register from './Register'
import Login from './Login'
import Nav from './Nav'
import Main from './Main'
import Home from './Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

export const store= createContext();

function App() {
  const [token,setToken]=useState(null)

  return (
    <div>
      <store.Provider value={[token, setToken]}>
      <BrowserRouter>
      <Nav/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Main' element={<Main/>}/>
        </Routes>
        </BrowserRouter>
        </store.Provider>
        
    </div>
  )
}

export default App
