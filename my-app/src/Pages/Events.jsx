import React from 'react'
import { useState } from 'react'

const Events = () => {
  const [message,setMessage] = useState("")
  const handleMessage =(e)=>{
    setMessage(e.target.value)
    console.log(message)
  }
  const [isLoggedIn,setIsLoggedIn] = useState(false)
const handleIsLoggedIn =()=>{
  setIsLoggedIn(!isLoggedIn);
  
}
  const [count,setCount] = useState(0)
  const handleCount =()=>{
    setCount(count + 1)
  }
  return (
    <div className='flex items-center align-middle'>
      <button onClick={handleCount}>{count}</button>
      <button onClick={handleIsLoggedIn}>{isLoggedIn ? "Logout": "Login"}</button>
      <input type="text" placeholder='Type a message' value={message} onChange={handleMessage}/>
      <p>{message}</p>
    </div>
  )
}

export default Events