import  { useEffect, useRef, useState } from 'react'
import "./App.css"
import Pill from "./components/Pill"

const App = () => {
  const [search,setsearch]= useState()
  const [suggestion,setsuggestion]=useState([])
  const [selectedusers,setselectedusers]=useState([])
  const [selecteduserset,setselecteduserset]=useState(new Set())

  const inputref=useRef(null)

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
    inputref.current.focus()

  }

  function handleRemoveUser(user){
    const updatedusers=  selectedusers.filter((selecteduser)=>selecteduser.id !==user.id)
    setselectedusers(updatedusers);

    const updatedmails= new Set(selecteduserset)
    updatedmails.delete(user.email)
    setselecteduserset(updatedmails)
  }

  console.log(selectedusers);
  const handlekeydown=(e)=>{
    if(e.key=== "Backspace" && e.taregt.value===""  && selectedusers.length>0){
      const lastuser= selectedusers[selectedusers.length-1];
      handleRemoveUser(lastuser)
      setsuggestion([])
    }
  }
  
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
      <input ref={inputref} type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='enter the Text' onKeyDown={handlekeydown} />

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