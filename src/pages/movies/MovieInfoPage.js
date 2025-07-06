import '../../App.css';
import '../../assets/styles/bookInfoPageStyle.css';
import FormLabel from '@mui/material/FormLabel';
import { useLocation} from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

function MovieInfoPage() {
  const location = useLocation();
  const { movie, image } = location.state;
  const {theme} = useContext(ThemeContext)

  return (
    <div className="BookSearchingPage" id='movieInfoPage' >
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1 style={{color : theme==='dark'?'white':'#1a2027',}}>
                      Movie information
                </h1>
                <div className='mainDiv' id='infoDiv'>
                  <div className='first-div'>
                    <div className='book-attributs'>
                      <FormLabel className="labelClass" sx={{fontSize: '40px',color : theme==='dark'?'white':'default',fontWeight: 900}}>{movie.title}</FormLabel>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Director</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.director}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Year of release</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.year_of_release}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Genre</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.genre}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Mood</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.mood}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Language of the movie</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.language_of_movie}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>IMDB rating</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.imdb_rating}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Awards</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.awards}</FormLabel>
                      </div>
                    </div>
                    <a href={image[0]} target='_blank' style={{textDecoration:"none"}}><img src={image[0]} alt='poster of the movie' className='book-poster'></img></a>
                  </div>
                  <div className='second-div'>
                    <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 700}}>Description</FormLabel>
                    <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{movie.description}</FormLabel>
                  </div>
                </div>
        </main>
    </div>
  );
}

export default MovieInfoPage;