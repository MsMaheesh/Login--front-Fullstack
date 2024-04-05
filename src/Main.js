import React,{useEffect, useState, useContext} from 'react'
import { store } from './App'
import { Navigate } from 'react-router'
import axios from 'axios'
import './css/todo.css'

axios.defaults.baseURL="https://login-back-6ir4.onrender.com"
 //http://localhost:4500
//https://login-back-6ir4.onrender.com
function Main() {
    const [token,setToken]=useContext(store)
    const [userData,setuserData]=useState(null)

    const [status,setStatus]=useState(true)
    const [loading,setLoading]=useState(false)
    const[datalist,setDatalist]=useState([])
    const  [todoId,settodoId]=useState()
    const [message,setMessage]= useState({
        todo:"",   
    })
    
    
    const messageHandle=(e)=>{
        setMessage({
            ...message,
            todo:e.target.value
    });
    };
    

    const btn=async(e)=>{
        e.preventDefault();
        setLoading(true)
        await axios.post('/addtodo',message)
        // console.log(data)
        // console.log(data.status)
        setLoading(false)
        getdata()
        alert("todo added")
        setMessage({todo:""})
    }    
const getdata =async ()=>{
    setLoading(true)
    const data = await axios.get("/getdata")
    setDatalist(data.data)
    setLoading(false)

   // console.log(datalist)
}
useEffect(()=>{
    getdata();
    axios.get('/todo',{
     headers:{
       'x-token':token
     }
    }).then((res)=>setuserData(res.data)).catch((err)=>{
     console.log(err)
    })
 },[token])

 if(!token){
   return <Navigate to='/'></Navigate>
 }

 //console.log(userData.username)
 //console.log(userData,token) 
// useEffect(()=>{
//     getdata();
//  },[])

const delet =async(id)=>{
    setLoading(true)
    await axios.delete('/'+id)
    getdata()
    setLoading(false)
    alert("deleted successfully")      
} 
 
const edit = async(id,mess)=>{
    setStatus(false)
    console.log(id,mess)
    setMessage({todo:mess})
    settodoId(id)
    //console.log(message.todo,"j");
    
}
//console.log("mess:" , message, todoId,datalist)
//console.log(userData)
const editbtn = async(e)=>{
    e.preventDefault();
    setLoading(true)
    //console.log(id,mess.todo)
    await axios.put('/'+todoId,message)
    getdata()
    setLoading(false)
    alert("data updated successfully")
    setStatus(true)
}
  return (
    <>
    <div className='header'>
        <div >
            {userData &&
            <h3>user :- {userData.username}</h3>}
        </div>
        <button className='lobtn' onClick={()=>setToken(null)}>Logout</button>
    </div>
    <div className='box'>
    
    <div className='container'>
    <h2 >TODO'S</h2>
        <form className='form'>
            <input className='input'  
            placeholder='enter the message' 
            value={message.todo} 
            onChange={messageHandle}
            />
            <div className='button'>
            {status ?<button className='btn' onClick={btn} type="submit" >Add</button> :<button className='btn' onClick={editbtn}  >Edit</button>}
            </div>
        </form>
        <div className='todo_container'>
        {loading && <h1>loading...</h1>}
        {!loading && datalist.length===0 && <h2>no Todo</h2>}
            {   
                !loading && datalist.map((eachobj)=>{
                    const {todo,_id}=eachobj;
                    return (
                        <div className='todo_items' key={_id}>
                            <span >
                                {todo}
                            </span>
                            <div className='todo_btn'>
                            <button className="btn" onClick={()=>delet(_id)}>del</button>
                            <button className="btn" onClick={()=>edit(_id,todo)}>edit</button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    </div>
</div>
</>
  )
}

export default Main