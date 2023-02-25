import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Navbar from '../template/Navbar'
import {  } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
  const [data, setData] = useState({})
  const [Error,setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    axios(`http://localhost:5000/getuser/`,{
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((response)=>{
      setData(response.data)
    }).catch((error)=>{
      setError(error)
      console.log("fetcherror:"+error)
    }).finally((load)=>{
        setLoading(false)
    })
  },[])

  if(Error) return "system error!..."
  if(loading) return "reloadding..."
  return (
    <>
      <header className='fixed inset-x-0'>
        <Navbar />
      </header>
      <br className='mt-5' />
      <div className="h-screen">
        <div className='items-center w-full font-medium border-none sm:flex'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 w-full mr-2'>
            {data.map(res =>(
              <div className="mt-7 max-w-350px w-full bg-white bg-card-texture bg-no-repeat bg-top rounded-2xl shadow-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={res._id}>

                <div className="flex flex-col items-center justify-center pb-3 pt-3">
                    <img src={`http://localhost:5000/imgprofile/profile-users/${res.profile.photoImg}`} 
                      className="mb-3 rounded-full shadow-lg cursor-pointer" alt="" 
                      style={{
                        width:"150px",
                        height:"150px",
                        backgroundRepeat:"no-repeat",
                        objectFit:"cover",
                        backgroundAttachment:"fixed",
                        backgroundSize:"cover",
                        border:"5px solid gray"
                      }}
                    />
                    <h2 className='font-semibold text-3xl text-secondary'>{res.profile.fullname}</h2>
                    <p className='font-semibold text-lg tracking-widest'>{res.profile.location.province}</p>

                </div>
                <div className="flex justify-evenly mt-6 py-6 border border-neutral border-r-0 border-b-0 border-l-0">
                  <div className='text-center'>
                    <h3 className="font-bold text-secondary">80K</h3>
                    <p className="text-xs text-text tracking-widest">Followers</p>
                  </div>
                  <div className='text-center'>
                    <h3 className="font-bold text-secondary">100K</h3>
                    <p className="text-xs text-text tracking-widest">Like</p>
                  </div>
                  <div className='text-center'>
                    <h3 className="font-bold text-secondary">20</h3>
                    <p className="text-xs text-text tracking-widest">Blog</p>
                  </div>
                </div>
                    
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
