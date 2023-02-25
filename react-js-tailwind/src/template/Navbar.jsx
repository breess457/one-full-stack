import React,{useState,useEffect,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faHome,faStaffSnake,faContactBook, faBars,faUser,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

  function setToken(userToken){
    sessionStorage.setItem('token',JSON.stringify(userToken))
  }
  function getTokens(){
      const tokenString = sessionStorage.getItem('token')
      const userToken = JSON.parse(tokenString)
      return userToken?.token
  } 

  const removeToken = ()=>{
    sessionStorage.removeItem('token')
    setToken(null)
    Swal.fire({
      icon:"success",
      title:"logout success",
      showConfirmButton:false,
      timer:1500
    }).then((result)=>{
      window.location.href = "/"
    })
  }

export default function Navbar({fixed}) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const token = getTokens()
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white font-bold text-2xl lg:text-4xl"
              to="/"
            >
              Blog news
            </NavLink>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars}/>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item mr-2"> 
                <NavLink
                  className="px-3 py-2 flex items-center uppercase font-bold text-lg leading-snug text-white hover:opacity-75"
                  to="/"
                >
                  <FontAwesomeIcon icon={faHome} color="white" /><span className="ml-2">หน้าแรก</span>
                </NavLink>
              </li>
              <li className="nav-item mr-2">
                <NavLink
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/about/"
                >
                    <FontAwesomeIcon icon={faStaffSnake} color="white"/><span className="ml-2">บทความ</span>
                </NavLink>
              </li>
              <li className="nav-item mr-2">
                <NavLink
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/contact"
                >
                  <FontAwesomeIcon icon={faContactBook}/><span className="ml-2">นักเขียน</span>
                </NavLink>
              </li>
              {token ?(
                <li className='nav-item mr-10'>
                  <NavLink  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/profile" >
                      <FontAwesomeIcon icon={faUser} /> <span className='ml-2'>โปรไฟล์</span>
                  </NavLink>
                </li>
              ):null}
              <li className='nav-item ml-2'>
              {!token ?(
                <button className='bg-blue-200 text-black active:bg-blue-500 
                    font-bold px-4 py-2 rounded shadow hover:shadow-lg outline-none 
                    focus:outline-none mr-1 mb-1' type='button'
                  onClick={()=> setShowModal(true) }
                >
                  Login <FontAwesomeIcon icon={faUserCircle} color="white"/>
                </button>
              ):<button 
                  className='bg-red-200 text-black active:bg-blue-500 
                    font-bold px-4 py-2 rounded shadow hover:shadow-lg outline-none 
                    focus:outline-none mr-1 mb-1' type='button'
                    onClick={()=> removeToken()}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </button>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showModal ? (
        <Modal setModal={setShowModal} getToken={setToken}/> 
      ):null}
      
    </>
  )
}
