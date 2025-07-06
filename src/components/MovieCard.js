import '../App.css';
import '../assets/styles/bookCardStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faSave} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular ,faSave as faSaveRegular } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import fallbackImage from '../logo.svg';
import {useNavigate } from 'react-router-dom';

/*'https://covers.openlibrary.org/b/id/10110415-L.jpg'*/

function MovieCard({movie,image}) {
    const [save,setSave] = useState(false);
    const navigate = useNavigate();
    
    const handleSaveClick = async () => {
        //movie.images_urls = image
        const imageArray = [image[0], image[1]]; // or your two URLs
        const movieToSend = { ...movie, images_urls: imageArray };
        try {
            if (!save) {
            // Save book
            await fetch("http://localhost:5000/movies/add-movie", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            });
            } else {
            // Delete book by title
            await fetch(`http://localhost:5000/movies/delete-movie/${encodeURIComponent(movie.title)}`, {
                method: 'DELETE'
            });
            }
            setSave(!save);
        } catch (error) {
            console.error("Error with save/delete:", error);
        }
    };

    const checkMovieAvailability = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/movies/get-movie/${encodeURIComponent(movie.title)}`, {
                method: 'GET',
            });
            if (response.status === 200){
                setSave(true)
            }
            else{
                setSave(false)
            }
        } catch (error) {
            console.error("Error with save/delete:", error);
        }
    }

    useEffect(() => {checkMovieAvailability();} ,[])

    // Add fallback image
    const finalImage = image[0] || fallbackImage;
    return (
        <div className='result-container' >
            <div className='left-container' onClick={() => navigate('/movies-recommendations/results/movie-info', { state: { movie , image } })}>
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
                    <FontAwesomeIcon icon={save ? faSave : faSaveRegular} style={{width:"25px" , height :"auto"}} onClick={handleSaveClick}/>
                </div>
            </div>
                
        </div>
    );
}

export default MovieCard;