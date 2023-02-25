import React,{useEffect,useState,useContext} from 'react'
import Navbar from '../template/Navbar'
import FooterBtn from '../template/FooterBtn'
import axios from 'axios'
import BlogNews from '../template/BlogNews'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper,faFutbol,faTvAlt,faLandmarkFlag,faVestPatches,faMoneyBillTrendUp, faMicrochip, faPersonRifle, faBurger, faShieldVirus, faPersonBooth } from '@fortawesome/free-solid-svg-icons'
import { UserContect } from '../App'

export default function About() {

  const [data, setData] = useState([])
  const {token} = useContext(UserContect)
  
  useEffect(()=>{
    axios.get(`http://localhost:5000/blog/blogall/`,{
      headers:{
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
    }).then((result)=> setData(result.data)).catch((err)=>{
      console.log("error fetch:" + err)
    })
  },[])



  return (
    <>
      <header className='fixed inset-x-0'>
        <Navbar />
      </header>
      <br className='mt-5 mb-5'/>
      <main>
      <div className='mt-5'></div>

        <div className='w-full text-sm font-medium text-gray-900 rounded-lg border-none sm:flex'>
          <div className="w-full grid lg:grid-cols-2 xl:grid-cols-2">
              {data.map((mapData,i)=>(
                <BlogNews blogdata={mapData} index={i} key={mapData._id} />
              ))}
          </div>
          <div className="w-1/4 ">
            <div className="fixed">
              <aside className='w-64' aria-label='Sitebar'>
                  <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50">
                    <ul className='space-y-2'>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faNewspaper} />
                          <span className='ml-3'>ข่าวสาร</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faTvAlt} />
                          <span className='ml-3'>บันเทิง</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faFutbol} />
                          <span className='ml-3'>กีฬา</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faLandmarkFlag} />
                          <span className='ml-3'>การเมือง</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                          <span className='ml-3'>เศรษฐกิจ</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faMicrochip} />
                          <span className='ml-3'>ไอที่/เทคโนโลยี</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faPersonRifle} />
                          <span className='ml-3'>การทหาร</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faShieldVirus} />
                          <span className='ml-3'>สุขภาพ</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faPersonBooth} />
                          <span className='ml-3'>วัฒนธรรม</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className='
                            flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                            hover:bg-gray-100
                            '
                        >
                          <FontAwesomeIcon icon={faVestPatches} />
                          <span className='ml-3'>แฟร์ชั่น</span>
                        </a>
                      </li>
                    </ul>
                  </div>
              </aside>
            </div>
          </div>
        </div>
        
      </main>
      {token? (<FooterBtn />):null}
    </>
  )
}
