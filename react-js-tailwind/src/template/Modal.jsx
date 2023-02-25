import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import {useLocation,useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightToBracket, faXmarkCircle,faUserCircle} from '@fortawesome/free-solid-svg-icons'



export default function Modal({ setModal, getToken }) {
 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault() 
    try{
      const tokens = await axios.post('http://localhost:5000/login/',{
        username:username,
        password:password
      })
      getToken(tokens.data)
      document.addEventListener('change',setModal(false))
      Swal.fire({
        icon:'success',
        title:'login successs',
        showConfirmButton:false,
      }).then(()=>{
        window.location.pathname = "/profile"
      })
    }catch(ex){
        setError(true)
    }
  }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full  my-6 mx-auto max-w-md h-full h-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold"> <FontAwesomeIcon icon={faUserCircle}/> Login </h3>
              <button
                className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setModal(false)}
              >
                <FontAwesomeIcon icon={faXmarkCircle}/>
              </button>
            </div>
            {error ?(
              <div id='alert-1' className="p-4 mt-1 ml-9 mr-9 text-sm text-center text-red-700 bg-red-200 rounded-lg" role="alert">
                <span className="font-medium mr-4">ข้อมูลไม่ถูกต้อง</span> &nbsp;
                 <button type="button" 
                    className='ml-auto text-red-800 bg-none border-none'
                     aria-label='Close' onClick={()=>setError(false)}
                  >
                    <FontAwesomeIcon icon={faXmarkCircle} className="text-xl"/>
                 </button>
              </div>
            ):null}
            <div className="relative p-2 flex-auto"> 
              <form className="bg-gray-200 shadow-md rounded px-4 pt-6 pb-8 w-full" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-black text-sm font-bold mb-1">
                    username
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                    required id='username' name='username' placeholder='username' 
                    value={username} onChange={e=>setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-bold mb-1 mt-4">
                   password
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                    required id='password' name='password' placeholder='password'
                    value={password} onChange={e=>setPassword(e.target.value)}
                  />
                </div>
                  <div className="flex justify-between mt-5">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input type="checkbox" name="" id="remember" value="" 
                          className='w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800' 
                        />
                      </div>
                      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                  </div>
                  <button
                    className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    เข้าสู่ระบบ <FontAwesomeIcon icon={faRightToBracket} />
                  </button>
               </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              Loogkin to &nbsp;<Link to={'/signup'} className='underline text-blue-700' onClick={()=> setModal(false)}>create account</Link>
            </div>
          </div>
        </div>
    </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
Modal.propTypes = {
  getToken:PropTypes.func.isRequired
}