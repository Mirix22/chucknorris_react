import React from 'react'
import '../styles/Joke.css'

const Joke = ({joke}) => {
  return (
    <div className='Joke'>
      <p id='joke'>{joke}</p>
    </div>
  )
}

export default Joke
