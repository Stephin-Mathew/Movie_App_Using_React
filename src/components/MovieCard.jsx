import React from 'react'

const MovieCard = ({movie:
  {title,vote_average,poster_path,release_date,original_language,id}}) => {
  return (
    // <div>
    // <a rel='stylesheet' href={`https://www.themoviedb.org/movie/${id}-${title}`} target='blank'>
    <div className="movie-card">
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'no-movie.png'} alt={title}/>

    <div className="mt-4">
      <h3>{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star icon" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          <span> ○ </span>
          <p className="language">{original_language}</p>
          <span> ○ </span>
          <p>{release_date.split('-')[0]}
          </p>
        </div>
      </div>
    </div>

    </div>




    //  </a></div>
  )
}

export default MovieCard