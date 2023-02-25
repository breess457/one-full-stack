import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Navbar from '../template/Navbar'
import ImageTest from '../assets/image/wall3.jpeg'
import { useState,useEffect } from 'react'
import axios from 'axios'
import BlogNews from '../template/BlogNews'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper,faFutbol,faTvAlt,faLandmarkFlag,faVestPatches,faMoneyBillTrendUp, faMicrochip, faPersonRifle, faBurger, faShieldVirus, faPersonBooth,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [data, setData] = useState([])
  let navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:5000/blog/bloglimit',{
      headers:{
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
    }).then( (result) => {
      setData(result.data)
      console.log(result.data)
    })
    .catch(err => console.log("err: "+ err))
  },[])
  return (
    <>
    <div className='leading-normal tracking-normal' style={{
      fontFamily:"sans-serif",
      background:'linear-gradient(90deg, #d53369 0%, #daae51 100%)'
    }}>
      <header className='fixed inset-x-0'>
        <Navbar />
      </header>
      <div className='pt-28 py-10'>
       <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-3/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">
            What business are you?
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Main Hero Message to sell yourself!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Sub-hero message, not too long and not too short. Make it just right!
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Subscribe
          </button>
        </div>
        <div className="w-full overflow-auto h-80 md:w-2/5">
          
          {data.map((datas,i)=>(
            
            <BlogNews blogdata={datas} index={i} key={datas._id}/>
            
          ))}
        </div>
       </div>
      </div>
      <section className="bg-white border-b py-3">
        <div className="container justify-center mx-auto flex m-3">
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-6 border">
            <FontAwesomeIcon icon={faNewspaper} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faFutbol} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faTvAlt} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faLandmarkFlag} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faVestPatches} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faMicrochip} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faPersonRifle} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faBurger} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 mr-6 border">
            <FontAwesomeIcon icon={faShieldVirus} className="text-4xl hover:text-blue-500"/>
          </div>
          <div className="relative w-20 h-20 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl ml-6 border">
            <FontAwesomeIcon icon={faPersonBooth} className="text-4xl hover:text-blue-500"/>
          </div>
        </div>
      </section>
      <div className="relative bg-white" id='animation-carousel'>

      </div>
    </div>
    </>
  )
}
