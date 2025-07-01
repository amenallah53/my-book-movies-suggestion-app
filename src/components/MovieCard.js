import '../App.css';
import '../assets/styles/bookCardStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faSave} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular ,faSave as faSaveRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import fallbackImage from '../logo.svg';
import {useNavigate } from 'react-router-dom';

/*'https://covers.openlibrary.org/b/id/10110415-L.jpg'*/

function MovieCard({movie,image}) {
    const [like,setLike] = useState(false);
    const [save,setSave] = useState(false);
    const navigate = useNavigate();
    // Add fallback image
    const finalImage = image[0] || fallbackImage;
    return (
        <div className='result-container' onClick={() => navigate('/movies-recommendations/results/movie-info', { state: { movie , image } })}>
            <div className='left-container'>
                <div className='image-container'>
                    <img src={finalImage} alt={movie.title}></img>
                </div>
                <div className='info-container'>
                    <h4>{movie["title"]}</h4>
                    <p>{movie["director"]}</p>
                </div>
            </div>
            
            <div className='right-container'>
                <div className='icon-container'>
                    <FontAwesomeIcon icon={like ? faHeart : faHeartRegular} style={{color:"red" , width:"25px" , height :"auto"}} onClick={(e)=>setLike(!like)}/>
                </div>
                <div className='icon-container'>
                    <FontAwesomeIcon icon={save ? faSave : faSaveRegular} style={{width:"25px" , height :"auto"}} onClick={(e)=>setSave(!save)}/>
                </div>
            </div>
                
        </div>
    );
}

export default MovieCard;