import '../../assets/styles/Form.css';
import { useContext, useEffect, useState } from 'react';
import BasicSelect from '../DropDownButton';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import RowRadioButtonsGroup from '../RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import handleSubmit from "../../functions/books/handleBookSubmit"
import { genres } from './BookGenres';
import { ThemeContext } from '../../App';

function BookForm() {
  const {theme} = useContext(ThemeContext)
  //state variables
  const navigate = useNavigate();
  const [listGenre, setListGenre] = useState([]);
  const [language,setLanguage] = useState('');
  const [authors,setAuthors] = useState('');
  const [fromYear,setFromYear] = useState('');
  const [toYear,setToYear] = useState('');
  const [bookLength,setBookLength] = useState('');
  const [extraDescription,setExtraDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setListGenre(structuredClone(genres));
  }, []);

  const genreClassName = 'genre-' + theme


  /* arrow function */
  const handleGenreClick = (index) => {
    var updatedList = [...listGenre]; //deep copy
    updatedList[index].clicked = !updatedList[index].clicked;
    setListGenre(updatedList);
  }

  return (
    <form 
      onSubmit={(e) => handleSubmit(e, {
        setIsLoading,
        navigate,
        listGenre,
        language,
        authors,
        fromYear,
        toYear,
        bookLength,
        extraDescription
      })}  
      className='formClass'>
      <FormLabel className="labelClass" sx={{fontSize: '40px',color: 'white',fontWeight: 500}}>Genre</FormLabel>
      <div className="genre-options">
        {listGenre.map((element, index) => (                                                  /*() => handleGenreClick(index)*/
          <div key={index} className={element.clicked ? genreClassName+"-clicked" : genreClassName} onClick={function(){ handleGenreClick(index)}}>
            {element.genre}
          </div>
        ))}
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',color: 'white',fontWeight: 500}}>Language</FormLabel>
      <BasicSelect isLoading={isLoading} value={language} onChange={setLanguage}/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',color: 'white',fontWeight: 500}}>Author(s)</FormLabel>
      <Input 
        disabled={isLoading}
        size="lg"
        placeholder="Enter preferred author..." 
        onChange={(e) => setAuthors(e.target.value)}
        sx={{width: '300px',}}
      />

      <FormLabel className="labelClass" sx={{fontSize: '40px',color: 'white',fontWeight: 500}}>Publication Year Range</FormLabel>
      <div id='inputNumbersDiv'>
        <Input 
          disabled={isLoading}
          type="number"
          placeholder="From year" 
          size="lg"
          onChange={(e) => setFromYear(e.target.value)}
          sx={{width: '300px',}}
        />
        <Input 
          disabled={isLoading}
          type="number"
          size="lg"
          placeholder="To year" 
          onChange={(e) => setToYear(e.target.value)}
          sx={{width: '300px',}}
        />
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',color: 'white',fontWeight: 500}}>Book length</FormLabel>
      <RowRadioButtonsGroup isLoading={isLoading} value={bookLength} onChange={setBookLength}/>
      <Textarea disabled={isLoading} size="lg" name="Outlined" onChange={(e) => setExtraDescription(e.target.value)} placeholder="Add other more description for more specification..." variant="outlined" minRows = {3} />
      <Button
        type="submit"
        sx={{
          width: "300px",
          background: theme === 'light' ? '#1874d2' : '#bb6cf1',
          '&:hover': {
            backgroundColor: theme === 'light' ? '#0d3f73' : '#692e9b',
          },
        }}
        size="lg"
        loading={isLoading}
        endDecorator={<KeyboardArrowRight />}
      >
        Get Recommendations
      </Button>
      
    </form>
  );
}

export default BookForm;