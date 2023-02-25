import React,{Fragment, useState,useContext} from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmarkCircle,faUserEdit,faEdit} from '@fortawesome/free-solid-svg-icons'
import {ThailandAddressTypeahead,ThailandAddressValue, DistrictInput,SubdistrictInput,ProvinceInput,PostalCodeInput} from 'react-thailand-address-typeahead'
import axios from 'axios'
import { UserContect } from '../App'

export default function EditProfile({setModalEdit}) {
    const {data} = useContext(UserContect)
    let dataProfile = data.profile
    const [occupation, setOccupation] = useState(dataProfile.occupation)
    const [status, setStatus] = useState(dataProfile.status)
    const [quotation, setQuotation] = useState(dataProfile.quotation)
    const [sex, setSex] = useState(dataProfile.sex)
    const [age, setAge] = useState(dataProfile.age)
    const [val, setVal] = useState(ThailandAddressValue.fromDatasourceItem({
        s:dataProfile.location.district1,
        d:dataProfile.location.district2,
        p:dataProfile.location.province,
        po:dataProfile.location.zipcode
    }))

     const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            
            await axios.put(`http://localhost:5000/edit/profile/detailprofile/${data._id}`,{
                SubdistrictInput:val.subdistrict,
                DistrictInput:val.district,
                Province:val.province,
                Postacode:val.postalCode,
                occupation:occupation,
                status:status,
                quotation:quotation,
                sex:sex,
                age:age
            }).then((res)=>{
                console.log(res.data)
                setModalEdit(false)
                Swal.fire({
                    icon:"success",
                    text:res.data.msg,
                    showConfirmButton:false,
                    timer:1500
                }).then(()=> window.location.reload())
            }).catch(e =>{
                console.log(e.config)
            }) 
        }catch(e){
            console.log("erss"+e)
        }
       
        
     }
  return (
    <>

    <div className="justify-center items-center flex overflow-x-hidden overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 max-w-3xl h-full h-auto top-40 lg:top-2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700 dark:text-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font=semibold"> <FontAwesomeIcon icon={faUserEdit}/> แก้ไขข้อมูลส่วนตัว </h3>
                  <button
                    className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setModalEdit(false)}
                  >
                    <FontAwesomeIcon icon={faXmarkCircle}/>
                  </button>
                </div>
                <form noValidate onSubmit={handleSubmit}>
                  <div className="relative p-2 flex-auto">
                    <div className="flex flex-col">
                         <div className="relative z-0 mb-6 w-full group">
                           <label className='block text-sm font-medium text-lg font-medium text-gray-900 dark:text-white'>ที่อยู่ ปัจจุบัน</label>
                            <div className='grid grid-cols lg:grid-cols-2 gap-6 p-2 basic'>
                                <ThailandAddressTypeahead value={val} onValueChange={(value)=> setVal(value)}>
                                    <ThailandAddressTypeahead.Suggestion 
                                        containerProps={{
                                            className:"suggestion-container"
                                        }}
                                        optionItemProps={{
                                            className:"suggestion-option",
                                        }}
                                        
                                    />
                                    <SubdistrictInput 
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                        containerProps={{
                                            className:"address-input-field-container",
                                        }}
                                        
                                        placeholder="ตำบล / แขวง" required
                                    />
                                     <DistrictInput 
                                         className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                         containerProps={{
                                             className:"address-input-field-container"
                                         }}
                                         placeholder="อำเภอ / เขต" required
                                     />
                                     <ProvinceInput
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                        containerProps={{
                                            className:"address-input-field-container"
                                        }}
                                        placeholder="จังหวัด" required
                                     />
                                     <PostalCodeInput
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                        containerProps={{
                                            className:"address-input-field-container"
                                        }}
                                        placeholder="ไปรษณีย์" required
                                     />
                                </ThailandAddressTypeahead>
                            </div>
                        </div>
                        <div className="lg:flex flex-row gap-6 p-2">
                            <div className="relative z-0 mb-6 w-full group">
                                <label className='block mb-3 text-sm font-medium text-lg font-medium text-gray-900 dark:text-white'>อาชีพปัจจุบัน</label>
                                <input type="text" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    value={occupation} onChange={(e)=>setOccupation(e.target.value)} required
                                />
                            </div>
                            <div className="relative z-0 mb-6 group w-1/2 lg:w-1/6">
                                <label className='block mb-3 text-sm font-medium text-lg font-medium text-gray-900 dark:text-white'>อายุ</label>
                                <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={age} onChange={(e)=>setAge(e.target.value)} required
                                />
                            </div>
                            <div className="relative z-0 mb-6 group w-1/2 lg:w-1/6">
                                <label className='block mb-3 text-sm font-medium text-lg font-medium text-gray-900 dark:text-white'>เพศ</label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={sex} onChange={(e)=>setSex(e.target.value)} required
                                >
                                    <option hidden>&nbsp;--</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                </select>
                            </div>
                            <div className="relative z-0 mb-6 group w-1/2 lg:w-1/3">
                                <label className='block mb-3 text-sm font-medium text-lg font-medium text-gray-900 dark:text-white'>สถานะ</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={status} onChange={(e)=>setStatus(e.target.value)} required
                                >
                                  <option hidden>-- เลือก --</option>
                                  <option value="โสด">โสด</option>
                                  <option value="มีแฟนแล้ว">มีแฟนแล้ว</option>
                                  <option value="หมั้นแล้ว">หมั้นแล้ว</option>
                                  <option value="แต่งงานแล้ว">แต่งงานแล้ว</option>
                                  <option value="แยกกันอยู่">แยกกันอยู่</option>
                                  <option value="หม้าย">หม้าย</option>
                                  <option value="ค่อนข้างอธิบายยาก">ค่อนข้างอธิบายยาก</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 p-2">
                            <label htmlFor="" className='block text-sm font-medium text-gray-900 dark:text-white'>คติประจำใจ</label>
                            <textarea rows="2" 
                                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={quotation} onChange={(e)=>setQuotation(e.target.value)} required
                            />
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                   
                    <button 
                        className="ml-auto text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
                                dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        type='button'
                        onClick={()=>setModalEdit(false)}
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
    </div>
    </>
  )
}
