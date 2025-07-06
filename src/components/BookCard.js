import '../App.css';
import '../assets/styles/bookCardStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faSave} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular ,faSave as faSaveRegular } from '@fortawesome/free-regular-svg-icons';
import { useContext, useEffect, useState } from 'react';
import fallbackImage from '../logo.svg';
import {useNavigate } from 'react-router-dom';

/*'https://covers.openlibrary.org/b/id/10110415-L.jpg'*/

function BookCard({book,image}) {
    const [save,setSave] = useState(false);
    const navigate = useNavigate();

    const checkBookAvailability = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/books/get-book/${encodeURIComponent(book.title)}`, {
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

    const handleSaveClick = async () => {
        const bookToSend = { ...book, image }; // make a shallow copy with the image
        try {
            if (!save) {
            await fetch("http://localhost:5000/books/add-book", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookToSend)
            });
            } else {
            await fetch(`http://localhost:5000/books/delete-book/${encodeURIComponent(book.title)}`, {
                method: 'DELETE'
            });
            }
            setSave(!save);
        } catch (error) {
            console.error("Error with save/delete:", error);
        }
    };


    useEffect(() => {checkBookAvailability();} ,[])


    // Add fallback image
    const finalImage = image || fallbackImage;
    return (
        <div className='result-container' >
            <div className='left-container' onClick={() => navigate('/books-recommendations/results/book-info', { state: { book , image } })}>
                <div className='image-container'>
                    <img src={finalImage} alt={book.title}></img>
                </div>
                <div className='info-container'>
                    <h4>{book["title"]}</h4>
                    <p>{book["author"]}</p>
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

export default BookCard;