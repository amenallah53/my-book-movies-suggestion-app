import '../../assets/styles/Form.css';
import { useState,useContext,useEffect } from 'react';
import BasicSelect from '../DropDownButton';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CheckBoxButtonsGroup from '../CheckBoxButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { genres } from './MovieGenres';
import handleSubmit from '../../functions/movies/handleMovieSubmit'
import { ThemeContext } from '../../App';


function MovieForm() {
  const {theme} = useContext(ThemeContext)
  //state variables
  const navigate = useNavigate();
  const [listGenre, setListGenre] = useState([]); 
  const [language,setLanguage] = useState('');
  const [director,setDirector] = useState('');
  const [fromYear,setFromYear] = useState('');
  const [toYear,setToYear] = useState('');
  const [recognition, setRecognition] = useState([]);
  const [extraDescription,setExtraDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //deep copy For arrays with nested objects or arrays
    setListGenre(structuredClone(genres)); 
  }, []);

  /* arrow function */
  const handleGenreClick = (index) => {
    var updatedList = [...listGenre]; //deep copy
    updatedList[index].clicked = !updatedList[index].clicked;
    setListGenre(updatedList);
  }

  const genreClassName = 'genre-' + theme  

  return (
    <form
      onSubmit={(e) => handleSubmit(e, {
        listGenre,
        language,
        director,
        fromYear,
        toYear,
        recognition,
        extraDescription,
        setIsLoading,
        navigate
      })} 
      className='formClass'>
      <FormLabel className="labelClass" sx={{fontSize: '40px',color:'white',fontWeight: 500}}>Genre</FormLabel>
      <div className="genre-options">
        {listGenre.map((element, index) => (                                                  /*() => handleGenreClick(index)*/
          <div key={index} className={element.clicked ? genreClassName+"-clicked" : genreClassName} onClick={function(){ handleGenreClick(index)}}>
            {element.genre}
          </div>
        ))}
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',color:'white',fontWeight: 500}}>Language</FormLabel>
      <BasicSelect isLoading={isLoading} value={language} onChange={setLanguage}/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',color:'white',fontWeight: 500}}>Director</FormLabel>
      <Input 
        disabled={isLoading}
        size="lg"
        placeholder="Enter preferred director..." 
        onChange={(e) => setDirector(e.target.value)}
        sx={{width: '300px',}}
      />

      <FormLabel className="labelClass" sx={{fontSize: '40px',color:'white',fontWeight: 500}}>Release Year Range</FormLabel>
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

      <FormLabel className="labelClass" sx={{fontSize: '40px',color:'white',fontWeight: 500}}>Recognition & Reputation</FormLabel>
      <CheckBoxButtonsGroup isLoading={isLoading} value={recognition} onChange={setRecognition}/>
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

export default MovieForm;