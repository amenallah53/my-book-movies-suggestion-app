import { useEffect, useState } from 'react';
import '../../App.css';
import '../../assets/styles/bookCardStyle.css';
import MovieCard from '../../components/MovieCard';

function MovieHistoryPage() {
  const [search, setSearch] = useState('');
  const [movieList, setMovieList] = useState([]);

  const getAllMovies = async () => {
    try {
        const response = await fetch("http://localhost:5000/movies/get-movies");
        if (response.status === 200) {
        const movies = await response.json();
        setMovieList(movies); // set state here
        } else {
        setMovieList([]);
        }
    } catch (error) {
        console.error("Error with getting movies:", error);
        setMovieList([]);
    }
  };

  useEffect(() => {
    getAllMovies();
    console.log(movieList)
  }, []);

  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1>
                      Saved movies
                </h1>
                <input type='text' placeholder='Search to read movies by title...' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <div className='mainDiv' id='resultDiv'>
                    <div className="list-results">
                        {movieList.map((element, index) => (
                            <MovieCard key={index} movie={element} image={element.images_urls}/>
                        ))}
                    </div>
                </div>
                

        </main>
    </div>
  );
}

export default MovieHistoryPage;