import React from 'react'
import Search from './components/search'
import Spinner from './components/Spinner'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDebounce } from 'react-use' 
import MovieCard from './components/MovieCard';
import { updateSearchCount } from './appwrite';

const API_BASE_URL ='https://api.themoviedb.org/3';
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method :'GET',
  headers : {
    accept : 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [loading, setloading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

  useDebounce(()=>setdebouncedSearchTerm(searchTerm),300,[searchTerm])

   const fetchMovies = async (query='')=>{
    setloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); //To show the loader working 
      
      const endpoint = query ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      console.log(endpoint);
      
      const response = await fetch(endpoint,API_OPTIONS);
      //await new Promise(resolve => setTimeout(resolve, 3000));
      if(!response.ok){
        throw new Error("Failed to fetch ");   
      }
      const data = await response.json();
      if(data.Response ==false){
        seterrorMessage("Error obtaining Movies");
        setmovieList([]);
        return;
      }
      setmovieList(data.results)
      console.log(data.results);
      updateSearchCount();
      
    } catch (error) {
      seterrorMessage(`Error in fetching movies : ${error}`)
    }finally{
      setloading(false);
    }
  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero background"  />
          <h1>Find <span className="text-gradient">Movies</span> you will enjoy watching without a hastle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </header>
         
        <section className="all-movies">
          <h2>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      
      </div>
    </main>
  )
}
export default  App;



// import './App.css'
// import { useState,useEffect } from 'react'

// const Card = ({title})=>{
//   const [hasLiked,setHasLiked]=useState(false)
//   const [count,setCount]=useState(0)
  

//   useEffect(()=>{
//     console.log(`${title} has been Liked ${hasLiked}`);
    
//   })
//   return(
//     <div className="card" onClick ={()=>{
//       setCount(count+1)
//     }}>
//       <h2>{title}</h2>
//       <h3>{count ? count : null}</h3>
//       <button onClick={()=>{
//         setHasLiked(!hasLiked)
//       }}>{hasLiked? "❤️" : "🤍"}</button>
//     </div>
//   )
// }

// const App1 = ({title})=>{
//    return (
//     <h2>hello {title} </h2>
//    )
// }
// const App =()=>{
//   return (
    
//     <div className="card-container">
//     <Card title="Avatar" />
//     <Card title="Wednesday" />
//     <Card title="Scorpion" />



// {/* 
//     <App1 title="New World order"/> */}
//     </div>
//   )
// }

// export default App


