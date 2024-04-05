import React, { useState } from 'react'
import './css/register.css'

import axios from 'axios'


axios.defaults.baseURL="https://login-back-6ir4.onrender.com"
//https://login-back-6ir4.onrender.com
//http://localhost:4500
function Register() {
    //const [daa ,setDaa]=useState([])
    const [data,setData]=useState({
        username:'',email:'', password:'', confirmpassword:''
    })
    
    const Onchange=(e)=>{

        setData({...data,[e.target.name]:e.target.value})
    }
    //console.log(data)

    const Registerhandler =async ()=>{
        //e.preventDefault()
        if(data.username!=='' && data.email!=='' && data.password!=='' && data.confirmpassword!==''){
            const res=await axios.post('/register',data)
            //console.log('data register',res)
            window.alert(res.data)
        setData({
            username:'',email:'', password:'', confirmpassword:''
        })
        }
        else{
            window.alert('fill the form correctly')
        }
        

    }
    // const dt= async()=>{
    //     const d= await axios.get('/getdata')
    //     await setDaa(d)
    //     //console.log(daa)
    // }
   
  return (
    <div className='r'>
        <center className='registercontainer'>
            <input className='input' placeholder='username' name='username' type='text' onChange={Onchange} value={data.username} required></input>
            <input className='input' placeholder='email' name='email' type='email' onChange={Onchange} value={data.email} required></input>
            <input className='input' placeholder='password' name='password' type='password' onChange={Onchange} value={data.password} required></input>
            <input className='input' placeholder='confirmpasseord' name='confirmpassword' type='password' onChange={Onchange} value={data.confirmpassword} required></input>
            <div>
                <button className='btn1' onClick={()=>Registerhandler()}>Register</button>
                {/* <button onClick={()=>dt()}>dt</button> */}
            </div>
        </center>
    </div>
  )
}

export default Register