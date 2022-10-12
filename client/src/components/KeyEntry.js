import React from 'react'
import Tile from './Tile'

export default function KeyEntry({ className, description }) {
  return (  
    <div className='keyWrap'>
      <Tile colorTag={className}/>
      <h5 className='keyDescription'>{description} </h5>
    </div>
  )
}
