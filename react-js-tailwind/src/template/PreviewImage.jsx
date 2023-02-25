
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faCloudUpload} from '@fortawesome/free-solid-svg-icons'

export default function PreviewImage({setImageState,setHight}) {
    
    
      function setPreview(){
        let setWrapper = document.querySelector('.wrapper')
        let setImageName = document.querySelector('.file-name')
        let cancle = document.querySelector('.btn-cancle')
        let Image = document.querySelector('.me-image')
        let defultInput = document.querySelector('.set-default-image')
        let setExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

          defultInput.click()
        
            defultInput.addEventListener("change", function(){
                const file = this.files[0]
                 if(file){
                    const reader = new FileReader()
                     reader.onload = ()=>{
                        const result = reader.result
                         Image.src = result
                         setWrapper.classList.add('active')
                     }
                     cancle.addEventListener("click", function(){
                        Image.src = null
                        setImageState(null)
                        setWrapper.classList.remove("active")
                     })
                     reader.readAsDataURL(file)
                 }
                 if(this.value){
                    let valueStore = this.value.match(setExp)
                      setImageName.textContent = valueStore
                 }
            })
      }

  return (
    <div className=''>
        <div className="wrapper" id='buttonCustom' onClick={setPreview} style={{
            height:setHight
        }}>
            <div className="s-image">
                <img src="" alt="" className="me-image" />
            </div>
            <div className="m-content">
                <div className="icons">
                    <FontAwesomeIcon icon={faCloudUpload} />
                </div>
                <div className="text-m">อัปโหลดโปรไฟล์</div>
            </div>
            <div className="btn-cancle">
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="file-name">File name hear</div>
        </div>
        <input type="file" name="" id="" className='set-default-image' accept='image/*'
             onChange={e => setImageState(e.target.files[0])} hidden
        />
    </div>
  )
}
