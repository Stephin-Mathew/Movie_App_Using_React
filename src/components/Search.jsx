import React from 'react'

const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search icon"/>
        <input type="text" placeholder='Search through thousands of movies' className='text-white' 
        value={searchTerm}
        onChange={(e)=>{setsearchTerm(e.target.value);
         }}  />
      </div>
    </div>
  )
}

export default Search