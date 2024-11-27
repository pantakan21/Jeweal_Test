import React from 'react'
import "./UserInput.css"

const UserInput = () => {
    return (
        <div>
            <form className='user-input-form'>
                <input className = "space" type="text" placeholder='หมายเลขเอกสาร'/>
                <input className = "space" type="text" placeholder='วันที่ออกเอกสาร'/>
                <input className = "space" type="text" placeholder='วันที่ครบกำหนด'/>
                <input className = "space" type="text" placeholder='ชื่อลูกค้า'/><br/><br/>
                <input className = "space" type="text" placeholder='ที่อยู่ออกใบกำกับ'/>
                <input className = "space" type="text" placeholder='ที่อยู่จัดส่ง'/>
                <input className = "space" type="text" placeholder='หมายเลขเอกสารอ้างอิง'/>
                <input className = "space" type="text" placeholder='Currency'/>
            </form>
        </div>
    )
}

export default UserInput
