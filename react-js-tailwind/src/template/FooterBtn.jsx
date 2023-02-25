import * as React from 'react'
import{useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faXmarkCircle,faWarning,faClose } from '@fortawesome/free-solid-svg-icons'
import RickEditor from '../components/setConfig'
import { UserContect } from '../App'
import PreviewImage from './PreviewImage'
import axios from 'axios'
import toast,{ Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
function GetblogModal({setmodal}){
  
  const [blogtitle, setBlogTitle] = useState('')
  const [blogtype, setBlogType] = useState('')
  const [image, setImage] = useState()
  const [blogdetail,setBlogDetail] = useState('')
  const {data} = useContext(UserContect)


    const handleOnSubmit = async(e)=>{
      e.preventDefault()
      try{
        if(!image){ 
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
            formData.append('UserId',data._id)
            formData.append('BlogTitle',blogtitle)
            formData.append('BlogType',blogtype)
            formData.append('image',image)
            formData.append('blogdetail',blogdetail)
             console.log(formData)
          await axios({
            method:"POST",
            url:`http://localhost:5000/blog/create/`,
            data:formData,
            headers:{"Content-Type": "multipart/form-data"}
          }).then((res)=>{
            console.log(res.data)
            Swal.fire({
              icon:"success",
              text:"insert blog new success fully"
            }).then(()=>{
              setmodal(false)
              window.location.reload()
            })
          }).catch((er=>{
            console.log("fetch error: "+er)
          }))
        }
      }catch(e){
        console.log("try error : "+e)
      }
    }
   
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 max-w-3xl h-full h-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-xl font=semibold">เขียนบทความ</h3>
                      <button
                        className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={() => setmodal(false)}
                      >
                        <FontAwesomeIcon icon={faXmarkCircle}/>
                      </button>
                  </div>
                  <form onSubmit={handleOnSubmit} noValidate>
                    <div className="relative p-2 flex-auto">
                      <div className="lg:flex">
                        <div className="p-4 flex-row gap-6 w-full">
                          <div className="z-0 mb-2 w-full group">
                            <label className="block text-black text-sm font-bold mb-1">
                              หัวข้อ
                            </label>
                            <input 
                              className="shadow appearance-none border rounded w-full py-2 px-2 text-black" 
                              required id='titleBlog' name='titleBlog' placeholder='หัวข้อบทความ' 
                              value={blogtitle} onChange={(e)=>setBlogTitle(e.target.value)}
                            />
                          </div>
                          <div className="elative z-0 mb-2 group w-full lg:w-1/2">
                            <label className="block text-black text-sm font-bold mb-1">
                              ประเภท
                            </label>
                            <select 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                              value={blogtype} onChange={(e)=>setBlogType(e.target.value)}
                            >
                              <option hidden>&nbsp;--</option>
                              <option value="ข่าวสาร">ข่าวสาร</option>
                              <option value="บันเทิง">บันเทิง</option>
                              <option value="กีฬา">กีฬา</option>
                              <option value="การเมือง">การเมือง</option>
                              <option value="เศรษฐกิจ">เศรษฐกิจ</option>
                              <option value="ไอที/เทคโนโลยี">ไอที/เทคโนโลยี</option>
                              <option value="การทหาร">การทหาร</option>
                              <option value="สุขภาพ">สุขภาพ</option>
                              <option value="วัฒนธรรม">วัฒนธรรม</option>
                              <option value="แฟชั้น">แฟชั้น</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-1/2 ml-9 lg:w-1/3 lg:ml-0">
                          <PreviewImage setImageState={setImage} setHight={'180px'}/>
                        </div>
                      </div>
                      <div className=" mb-6">
                        <label className="block text-black text-sm font-bold mb-1">
                          เนื้อหาบทความ
                        </label>
                        <RickEditor detail={blogdetail} setDetail={setBlogDetail} />
                      </div>
                    </div> 
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button 
                          className="ml-auto text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
                                  dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          type='button'
                          onClick={()=>setmodal(false)}
                      >ยกเลิก</button>
                      <button 
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          type="submit"
                      >
                          <FontAwesomeIcon icon={faEdit}/>&nbsp; บันทึก
                      </button>
                    </div> 
                  </form>
                </div>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
}

export default function FooterBtn() {
    const [modalblog, setmodalBlog] = useState(false)
  return (
    <>
      <footer 
        className="p-4 fixed inset-x-0 bottom-0" 
      >
        <div className="relative bottom-20 md:bottom-7 xl:bottom-0 mr-1">
          <div className="absolute right-3 md:bottom-0 lg:bottom-0 w-auto h-auto">
            <button 
                className='bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 
                            rounded-2xl shadow-xl border-white-100 text-gray-600 
                            hover:bg-gray-200 hover:text-gray-900 font-bold rounded-full 
                            text-xl p-5 text-center inline-flex items-center'
                onClick={()=>setmodalBlog(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
      </footer>
      {modalblog ? (
        <GetblogModal setmodal={setmodalBlog}/>
      ):null}
    </>
  )
}
