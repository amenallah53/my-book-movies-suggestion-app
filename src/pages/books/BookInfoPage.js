import '../../App.css';
import '../../assets/styles/bookInfoPageStyle.css';
import FormLabel from '@mui/material/FormLabel';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useContext } from 'react';


function BookInfoPage() {
  const location = useLocation();
  const { book , image } = location.state;
  const {theme} = useContext(ThemeContext);
  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1 style={{color : theme==='dark'?'white':'#1a2027',}}>
                      Book information
                </h1>
                <div className='mainDiv' id='infoDiv'>
                  <div className='first-div'>
                    <div className='book-attributs'>
                      <FormLabel className="labelClass" sx={{fontSize: '40px',color : theme==='dark'?'white':'default',fontWeight: 900}}>{book.title}</FormLabel>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Author(s)</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.author}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Year of publish</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.year_of_publish}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Genre</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.genre}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Mood</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.mood}</FormLabel>
                      </div>
                      <div className='attribut'>
                        <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 500}}>Languages of the book</FormLabel>
                        <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.languages_of_book}</FormLabel>
                      </div>
                    </div>
                    <a href={image} target='_blank' style={{textDecoration:"none"}}><img src={image} alt='poster of the book' className='book-poster'></img></a>
                  </div>
                  <div className='second-div'>
                    <FormLabel className="labelClass" sx={{fontSize: '30px',color : theme==='dark'?'white':'default',fontWeight: 700}}>Description</FormLabel>
                    <FormLabel className="labelClass" sx={{fontSize: '20px',color : theme==='dark'?'white':'default',fontWeight: 500}}>{book.description}</FormLabel>
                  </div>
                </div>
        </main>
    </div>
  );
}

export default BookInfoPage;