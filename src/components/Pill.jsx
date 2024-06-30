import React from 'react'

const Pill = ({image,text,onClick}) => {
  return (
    <span className='user-pill' onClick={onClick}>
      
      <img src={image} alt={text} />
      {text}
    </span>
  )
}

export default Pill