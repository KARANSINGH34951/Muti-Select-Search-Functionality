import  { useEffect, useState } from 'react'
import "./App.css"
import Pill from "./components/Pill"

const App = () => {
  const [search,setsearch]= useState()
  const [suggestion,setsuggestion]=useState([])
  const [selectedusers,setselectedusers]=useState([])
  const [selecteduserset,setselecteduserset]=useState(new Set())

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

   function handleselecteduser(user){
    setselectedusers([...selectedusers,user]);
    setselecteduserset(new Set([...selecteduserset,user.email]))
    setsuggestion([])
    setsearch("")   

  }

  function handleRemoveUser(user){

  }

  console.log(selectedusers);
  
  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* pills */}

        {
          selectedusers.map((user)=>{
            return <Pill key={user.email}
            image={user.image}
            text={`${user.firstName} ${user.Lastname}`}
            onClick={()=>handleRemoveUser(user)}
            
            />
          })
        }
        {/* input feild */}
      <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='enter the Text' />

      <ul className="suggestions-list">

      {suggestion?.users?.map((user)=>{
        return !selecteduserset.has(user.email) ? (
        <li key={user.email} onClick={()=> handleselecteduser(user)}>
        <img src={user.image} alt={`${user.firstName} ${user.Lastname}`} />
        <span>{user.firstName} {user.lastName}</span>
      </li>) : <></>
      })}

      </ul>
          
      </div>
    </div>
  )
}

export default App