import React,{useState} from 'react'
import PropTypes from 'prop-types'
import PreviewImage from '../template/PreviewImage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBackspace,faUser,faRightToBracket, faClose, faWarning} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import toast,{Toaster} from 'react-hot-toast'

  function setToken(tokens){
    sessionStorage.setItem('token',JSON.stringify(tokens))
  }

export default function Signup() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [image, setImage] = useState()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      if(!(image&& fullname && password && username)){
        document.onchange(toast((t)=>(
          <div  className="flex">
            <FontAwesomeIcon icon={faWarning} className="font-medium text-lg text-yellow-900 mt-3 mb-2 ml-2"/>
            <div className="ml-3 w-full mr-3 mb-2 mt-3 text-sm font-medium text-blue-700 dark:text-blue-800">
              กรุณาเพิ่มรูปโปรไฟล์ รวมทั้งข้อมูลอื่นๆให้ครบถ้วน
            </div>
            <div className="flex border-l border-gray-200">
            <button 
              className='w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-lg font-bold text-red-800 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              type='button' onClick={()=>toast.dismiss(t.id)}
            >
              <FontAwesomeIcon icon={faClose}/>
            </button>
            </div>
          </div>
        ),{
          id: "unique-notification", 
          position: "top-center",
          style:{
            border: '1px solid #f10505',
            padding: '16px',
            color: '#713200',
            maxWidth:'650px',
          },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          
        }))
      }else{
      const formData = new FormData()
        formData.append('username',username)
        formData.append('password',password)
        formData.append('fullname',fullname)
        formData.append('image',image)
      
        await axios({
          method:"POST",
          url:"http://localhost:5000/signup/",
          data:formData,
          headers:{
            "Content-Type": "multipart/form-data"
          }
        }).then((response)=>{
          setToken(response.data)
          console.log(response.data)
          Swal.fire({
            icon:'success',
            title:'login successs',
            showConfirmButton:false,
            timer:1500
          }).then(()=>{
            window.location.pathname = "/profile"
          })
        }).catch((res)=>{
          console.log(res.response.data)
        })
      }
      
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 mb-10">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link className="px-3 py-2 flex items-center uppercase font-bold leading-snug text-white hover:opacity-75 text-2xl  md:text-2xl lg:text-3xl xl:text-4xl" to="/">
              <FontAwesomeIcon icon={faBackspace}/> 
            </Link>
            <p className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-white" style={{fontFamily:'cursive'}}>สมัคใหม่</p>
          </div>
        </nav>
      <div className='flex flex-col lg:flex-row xl:flex-row md:flex-col'>
        <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
          <h1 className="block w-full text-center text-gray-800 text-2xl font-normal mb-6" style={{ fontFamily:'cursive' }}>
             <FontAwesomeIcon icon={faUser}/> สมัคเพื่อใช้งาน
          </h1>
            
          <form noValidate className="" onSubmit={handleSubmit}>
            
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row relative">
              <div className="mt-7 mr-4 w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3">
                <PreviewImage setImageState={setImage} setHight={'210px'}/>
              </div>
              <div className='w-full font-serif'>
                <div className="flex flex-col">
                  <label className="mb-1 ml-2 font-lg text-lg text-gray-600" htmlFor="username">อีเมล</label>
                  <input type="text" className="border w-full py-2 px-3 text-grey-800" name='' placeholder='อีเมล์เข้าสู่ระบบ' id='' 
                    value={username} onChange={e => setUsername(e.target.value)} required
                   />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-1 ml-2 font-lg text-lg text-gray-600" htmlFor="password">รหัสผ่าน</label>
                  <input type="text" className="border w-full py-2 px-3 text-grey-800" name='' placeholder='รหัสผ่าน' id=''
                    value={password} onChange={e => setPassword(e.target.value)} required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mt-3 mb-1 ml-2 font-lg text-lg text-gray-600" htmlFor="fullname">ชื่อผู้ใช้งาน</label>
                  <input type="text" className="border w-full py-2 px-3 text-grey-800" name='' placeholder='ชื่อผู้ใช้งาน' id='fullname'
                    value={fullname} onChange={e => setFullname(e.target.value)} required
                  /> 
                </div>
                
              </div>
            </div>
            <div className="flex flex-row">
              <button
                className="mt-5 w-full md:w-full lg:w-1/2 xl:w-1/3 ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                    เข้าสู่ระบบ <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/3">
          <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            
          >
            click notify
          </button>
        </div>
      </div>
      <Toaster/>
    </>
  )
}
Signup.prototype = {
  setToken:PropTypes.func.isRequired
}
