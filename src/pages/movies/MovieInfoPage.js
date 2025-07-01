import '../../App.css';
import '../../assets/styles/bookInfoPageStyle.css';
import FormLabel from '@mui/material/FormLabel';
import { useLocation} from 'react-router-dom';
import { useEffect } from 'react';

function MovieInfoPage() {
  const location = useLocation();
  const { movie, image } = location.state;

  useEffect(() => {
    // Set body background when component mounts
    document.body.style.backgroundImage = `url(${image[1]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundPosition = '';
    };
  }, [image]);

  return (
    <div className="BookSearchingPage" id='movieInfoPage' >
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1>
                      Movie information
                </h1>
                <div className='mainDiv' id='infoDiv'>
                  <div className='first-div'>
                    <div className='book-attributs'>
                      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 900}}>{movie.title}</FormLabel>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Director</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.director}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Year of release</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.year_of_release}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Genre</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.genre}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Mood</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.mood}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Language of the movie</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.language_of_movie}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>IMDB rating</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.imdb_rating}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 500}}>Awards</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.awards}</FormLabel>
                      </div>
                    </div>
                    <a href={image[0]} target='_blank' style={{textDecoration:"none"}}><img src={image[0]} alt='poster of the movie' className='book-poster'></img></a>
                  </div>
                  <div className='second-div'>
                    <FormLabel className="labelClass" sx={{fontSize: '30px',fontWeight: 700}}>Description</FormLabel>
                    <FormLabel className="labelClass" sx={{fontSize: '20px',fontWeight: 500}}>{movie.description}</FormLabel>
                  </div>
                </div>
        </main>
    </div>
  );
}

export default MovieInfoPage;