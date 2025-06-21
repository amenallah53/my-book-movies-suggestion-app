import '../App.css';
import '../assets/styles/bookCardStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faSave} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular ,faSave as faSaveRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';



function BookCard({book}) {
    const [like,setLike] = useState(false);
    const [save,setSave] = useState(false);
    return (
        <div className='result-container'>
            <div className='left-container'>
                <div className='image-container'>
                </div>
                <div className='info-container'>
                    <h4>{book["title"]}</h4>
                    <p>{book["author"]}</p>
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

export default BookCard;