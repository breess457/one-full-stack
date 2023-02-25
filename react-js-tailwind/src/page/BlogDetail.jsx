import React,{useState,useEffect} from 'react'
import Navbar from '../template/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function BlogDetail() {
    const [data, setData] = useState([])
    let {_id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:5000/blog/blogDetail/${_id}`,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((resutl)=>{
           setData(resutl.data)
        }).catch(err=>console.log(err))
    },[_id])
    console.log(data)

  return (
    <>
      <header className='fixed inset-x-0'>
        <Navbar />
      </header>
      <br className='mt-5 mb-5'/>
      <main>
        <div className='mt-5'></div>
        <div className='w-full text-sm font-medium text-gray-900 rounded-lg border-none sm:flex'>
            <div className="w-full border">
                <div className="ml-7 bg-white p-2 w-full max-w-6xl sm:p-4 flex-col h-full rounded-2xl shadow-lg">
                  <div className="ml-2">{data.blogType}</div>
                  <p className="font-semibold text-3xl text-center mb-5">{data.blogTitle}</p>
                  <div className="flex flex-col items-center mb-5 mt-2">
                    <img src={`http://localhost:5000/imgprofile/blogImg/${data.blogImage}`} alt="" className='shadow-lg' style={{
                        height:'400px'
                    }}/>
                  </div>
                  <div className="" dangerouslySetInnerHTML={{__html:data.blogDetail}}></div>
                </div>
            </div>
            <div className="w-1/4 border">
                <div className="prose lg:prose-xl">
                    ID: {_id}
                </div>
                <div className="ml-7 bg-white p-2 w-full max-w-4xl overflow-hidden sm:w-full sm:p-4 h-full sm:h-64 rounded-2xl shadow-lg">
                  <div className="">
                    <img src={`http://localhost:5000/imgprofile/blogImg/${data.blogImage}`} alt="" className=' border'/>
                  </div>
                  xxx
                </div>
                
            </div>
        </div>
      </main>
    </>
  )
}
