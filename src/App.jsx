import  { useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  const [search,setsearch]= useState()
  const [suggestion,setsuggestion]=useState([])

  useEffect(()=>{
    const fetchdata=()=>{
      if(search===""){
        setsuggestion([])
        return;
      }
  
      fetch(`https://dummyjson.com/users/search?q=${search}`)
      .then((res)=>res.json())
      .then((data)=>setsuggestion(data))
      .catch((err)=>
      console.log(err));
    }
    fetchdata()
  },[search])
  
  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* pills */}
        {/* input feild */}
      <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='enter the Text' />

      <ul className="suggestions-list">

      {suggestion?.users?.map((user)=>{
        return <li key={user.email}>
        <img src={user.image} alt={`${user.firstName} ${user.Lastname}`} />

        <span>{user.firstName} {user.lastName}</span>
  </li>
      })}

      </ul>
          
      </div>
    </div>
  )
}

export default App