import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome,faClock,faBriefcase,faHeart} from '@fortawesome/free-solid-svg-icons'
import { faNewspaper,faFutbol,faTvAlt,faLandmarkFlag,faVestPatches,faMoneyBillTrendUp, faMicrochip, faPersonRifle, faBurger, faShieldVirus, faPersonBooth } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../template/Navbar'
import EditProfile from '../template/EditProfile'
import FooterBtn from '../template/FooterBtn'
import { UserContect } from '../App'
import BlogNews from '../template/BlogNews'


export default function Profile() {
  const {data, error, loading} = useContext(UserContect)
  const [editModal,setEditModal] = useState(false)

  const [BlogData,setBlogData] = useState([])

  const current = new Date(data.newDate)
  const getYear = current.getFullYear()
   
  function setMonth(getmonth){
    switch (getmonth) {
      case '01':
        return "มกราคม"
        
      break;
      case '02':
        return "กุมภาพันธ์"
        
      break;
      case '03':
        return "มีนาคม"
        
      break;
      case '04':
        return "เมษายน"
        
      break;
      case '05':
        return "พฤษภาคม"
        
      break;
      case '06':
        return "มิถุนายน"
        
      break;
      case '07':
        return "กรกฎาคม"
        
      break;
      case '08':
        return "สิงหาคม"
        
      break;
      case '09':
        return "กันยายน"
        
      break;
      case '10':
        return "ตุลาคม"
        
      break;
      case '11':
        return "พฤศจิกายน"
        
      break;
      case '12':
        return "ธันวาคม"
        
      break;
    
      default:
        return getmonth
        break;
    }
  }
      
    useEffect(()=>{
      axios.get(`http://localhost:5000/blog/blogme/${data._id}`,{
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      }).then((response)=>{
       setBlogData(response.data)
      }).catch((err)=>{
         console.log(err)
      })
    },[data._id])

    if(error) return "Error!"
    if(loading) return "Loading....."
  return (
    <>
      <header className='fixed inset-x-0'>
        <Navbar />
      </header>
      <br className='mt-6'/>
      <main  className='mt-5'>
        <div className='w-full text-sm font-medium text-gray-900 rounded-lg border-none sm:flex'>
          <div className='w-full max-w-sm h-full p-6 border bg-white border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700  dark:text-white'>
            
            <div className="flex flex-col items-center pb-5">
              <img src={`http://localhost:5000/imgprofile/profile-users/${data.profile.photoImg}`} className="mb-3 rounded-full shadow-lg" alt="" style={{
                width:"150px",
                height:"150px",
                backgroundRepeat:"no-repeat",
                objectFit:"cover",
                backgroundAttachment:"fixed",
                backgroundSize:"cover",
                border:"5px solid gray"
              }}/>
              <p className='font-semibold text-3xl'>{data.profile.fullname}</p>
              <small className='font-semibold mt-4 text-center'>คติประจำใจ</small>
              <small className='font-semibold text-center'>{data.profile.quotation}</small>
            </div>
            <div className="flex justify-evenly py-3 border border-neutral border-r-0 border-b-0 border-l-0">
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
            
            <div className="flex-col justify-evenly mt-3 py-6 border border-neutral border-r-0 border-b-0 border-l-0">
              <div className="text-left mb-4">
                <p className='font-medium text-lg text-grey-600'>
                  <FontAwesomeIcon icon={faHome} className="text-gray-500"/> &nbsp;&nbsp; {data.profile.location.home} &nbsp;
                  {data.profile.location.district1}&nbsp;{data.profile.location.district2}&nbsp;
                  {data.profile.location.province}&nbsp;{data.profile.location.zipcode}
                </p>
              </div>
              <div className="text-left mb-4">
                <p className='font-medium text-lg text-grey-600'>
                  <FontAwesomeIcon icon={faBriefcase} className="text-gray-500"/>&nbsp;&nbsp; {data.profile.occupation}
                </p>
              </div>
              <div className="text-left mb-4">
                <p className='font-medium text-lg text-grey-600'>
                  <FontAwesomeIcon icon={faHeart} className="text-gray-500"/>&nbsp;&nbsp; {data.profile.status}
                </p>
              </div>
              <div className="text-left mb-4">
                <p className='font-medium text-lg text-grey-600'>
                  <FontAwesomeIcon icon={faClock} className="text-gray-500"/>&nbsp;&nbsp; เข้าร่วมเมื่อ {setMonth(current.getMonth().toString())}&nbsp;ปี {getYear}
                </p>
              </div>
              <div className="text-center">
              <button type="button"
                className="w-full py-2.5 px-5 mr-2 mb-2 text-sm 
                      font-medium text-gray-900 focus:outline-none 
                      bg-white rounded-lg border border-gray-200 hover:bg-gray-100
                      hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
                      dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400
                      dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={()=>setEditModal(true)}
                >แก้ไขข้อมูลส่วนตัว</button>
              </div>
            </div>
          </div>
         
          <div className='ml-2 w-full'>
            <div className="w-full">
              <h2 className='mt-2 text-lg text-center'>บทความ</h2>
               <div className="mx-auto px-10">
                  {BlogData.map((result,i)=>(
                     <BlogNews blogdata={result} index={i} key={result._id}/>
                 ))}
               </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="fixed mt-9">
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
        {editModal ? (
          <EditProfile setModalEdit ={setEditModal}/>
        ):null}
      </main>
      <FooterBtn  />
    </>
  );
}
