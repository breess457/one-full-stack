import React,{ useState,useEffect,createContext,useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import toast,{ Toaster } from 'react-hot-toast'
import './App.css'
import About from './page/About'
import Contact from './page/Contact'
import Errors from './page/Errors'
import Home from './page/Home'
import Profile from './page/Profile'
import Signup from './page/Signup'
import axios from 'axios'
import BlogDetail from './page/BlogDetail'

 export const UserContect = createContext()

  function App() {
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))
    const [data, setData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    async function FetchData(gettoken){
        await axios.get('http://localhost:5000/profile/',{
          headers:{
            "x-access-token":gettoken.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((response)=>{
          setData(response.data)
        }).catch((err)=>{
          console.log("Error Fetch User"+err)
          setError(err)
          sessionStorage.removeItem('token')
          setToken(null)
          window.location.pathname = '/'
          toast.error('session หมดอายุกรุณาเข้าสู่ระบบใหม่')
        }).finally(()=>setLoading(false))
    }

    useEffect(()=>{
      if(token){FetchData(token)} 
    },[])

    return (
      <UserContect.Provider value={{data,error,loading,token}}>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element= {<Profile/>}/>
            <Route path='/signup/' element={<Signup/>} />
            <Route path='/blogDetail/:_id' element={<BlogDetail/>} />
            <Route path='/*' element={<Errors />} />
          </Routes>
        </BrowserRouter>
      </UserContect.Provider>
    )
  }

export default App
