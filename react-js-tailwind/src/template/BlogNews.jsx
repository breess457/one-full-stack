import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faExternalLink } from '@fortawesome/free-solid-svg-icons'
import ImageTest from '../assets/image/wall3.jpeg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function BlogNews({blogdata,index}) {

    const [xdata, setData] = useState([])
    const currentDate = new Date(blogdata.newDate).toDateString()


    useEffect(()=>{
            axios(`http://localhost:5000/user/userAuther/${blogdata.userId}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then((response)=>{
                setData(response.data.profile)
            }).catch((err)=>{
                console.log(err)
            })
    },[blogdata.userId])

  return (
    <div 
        key={index}
        style={{ backgroundColor:'rgb(255, 255, 255)' }}
        className="ml-2 mr-2 mb-3 rounded-xl overflow-hidden justify-start border-dark-300 border"
    >
        <div style={{
                cursor:'auto',
                padding:'25px'
            }} 
            className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0"
        >
            <a href="" className="group">
                <div className="aspect-w-3 spect-h-2">
                    <img 
                        src={`http://localhost:5000/imgprofile/blogImg/${blogdata.blogImage}`}
                        alt="Featured Photo"
                        style={{
                            cursor:'auto',
                            width:'190px',
                            height:'140px'
                        }}
                        className="object-cover shadow-lg rounded-lg group-hover:opacity-75" 
                    />
                </div>
            </a>
            <div 
                className="sm:col-span-2"
                style={{
                    cursor:'auto'
                }}
            >
                <div
                    className="flex items-center spece-x-3"
                    style={{
                        cursor:'auto'
                    }}
                >
                    <div 
                        className="flex items-center spece-x-2"
                        style={{
                            cursor:'auto'
                        }}
                    >
                        <span
                            className='inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-blue-500'
                            style={{
                                cursor:'auto'
                            }}
                        >
                            <FontAwesomeIcon icon={faCircle} className="mr-2"/> {blogdata.blogType}
                        </span>
                        
                    </div>
                </div>
                <div 
                    className="mt-2"
                    style={{
                        cursor:'auto'
                    }}
                >
                    <a 
                        href="" 
                        className="group"
                    >
                        <h4 
                            style={{ 
                                cursor:'auto' 
                            }}
                            className="text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary"
                        >
                            {blogdata.blogTitle}
                        </h4>
                    </a>
                    <p 
                        className="mt-1 text-sm font-normal text-skin-base leading-5"
                        style={{
                            cursor:'auto' 
                        }}
                    >

                    </p>
                    <Link to={`/blogDetail/${blogdata._id}`} className='underline text-blue-700'>
                        อ่านเนื้อหา <FontAwesomeIcon icon={faExternalLink} />
                    </Link>

                    <div 
                        className="mt-6 flex items-center font-sans"
                        style={{
                            cursor:'auto' ,
                        }}
                    >
                        
                        <div className="ml-auto">
                            <p className="text-sm font-medium text-skin-inverted flex">
                                <a href="https://stackdiary.com" 
                                    className="hover:underline ml-auto mr-4" 
                                    style={{ cursor:'auto' }}
                                >{xdata.fullname}</a>
                                
                            </p>
                            <div className="flex space-x-1 mr-3  text-sm text-skin-muted" style={{
                                cursor:'auto'
                            }}>
                                <time 
                                    dateTime='2022-02-1'
                                    style={{ cursor:'auto',color:'blue' }}
                                >{currentDate}</time>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <a href="https://stackdiary.com/">
                                <span className="sr-only">{blogdata.userId}</span>
                                <img 
                                    className='h-10 w-10 rounded-full'
                                    style={{
                                        cursor:'auto'
                                    }}
                                    src={`http://localhost:5000/imgprofile/profile-users/${xdata.photoImg}`}
                                    //src={ImageTest}
                                    alt="Ekim Kael" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
