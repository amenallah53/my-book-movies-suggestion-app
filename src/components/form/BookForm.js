import '../../components/form/Form.css';
import { use, useState } from 'react';
import BasicSelect from './DropDownButton';
import Button from '../button';
import TextField from '@mui/material/TextField';
import CustomNumberInput from './CustomNumberInput';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';


function BookForm() {
  //state variables
  const [listGenre, setListGenre] = useState([
    { genre: 'Fantasy', clicked: false },
    { genre: 'Thriller', clicked: false },
    { genre: 'Sci-fi', clicked: false },
    { genre: 'Romance', clicked: false },
    { genre: 'Mystery', clicked: false },
    { genre: 'Historical', clicked: false },
    { genre: 'Fiction', clicked: false },
    { genre: 'Horror', clicked: false },
    { genre: 'Biography', clicked: false },
    { genre: 'Poetry', clicked: false },
  ]);
  const [language,setLanguage] = useState('');
  const [authors,setAuthors] = useState('');
  const [fromYear,setFromYear] = useState('');
  const [toYear,setToYear] = useState('');
  const [bookLength,setBookLength] = useState('');

  /* arrow function */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authors);
    console.log('Selected Genres:', listGenre.filter(g => g.clicked).map(g => g.genre));
    console.log('Selected Language:', language);
    console.log('Year From:', fromYear);
    console.log('Year To:', toYear);
  };
  /* normal function */
  function handleGenreClick(index) {
    var updatedList = [...listGenre]; //deep copy
    updatedList[index].clicked = !updatedList[index].clicked;
    setListGenre(updatedList);
  }

  return (
    <form onSubmit={handleSubmit} className='formClass'>
      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Genre</FormLabel>
      <div className="genre-options">
        {listGenre.map((element, index) => (                                                  /*() => handleGenreClick(index)*/
          <div key={index} className={element.clicked ? "genre-clicked" : "genre"} onClick={function(){ handleGenreClick(index)}}>
            {element.genre}
          </div>
        ))}
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Language</FormLabel>
      <BasicSelect value={language} onChange={setLanguage}/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Author(s)</FormLabel>
      <TextField
        id="outlined-basic"
        label="Enter preferred author"
        variant="outlined"
        onChange={(e) => setAuthors(e.target.value)}
        sx={{
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          // Hover state
          '&:focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '2px solid ${blue[400]}',
            }
          },
        }}/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Publication Year Range</FormLabel>
      <div id='inputNumbersDiv'>
        <CustomNumberInput text="From" value={fromYear} onChange={setFromYear}/>
        <CustomNumberInput text="To"  value={toYear} onChange={setToYear}/>
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Book length</FormLabel>
      <RowRadioButtonsGroup value={bookLength} onChange={setBookLength}/>
      <Button text={"Get Recommendations"} bgColor={"rgba(126, 0, 115, 0.48)"} 
      borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgb(210, 0, 255)"}/>
    </form>
  );
}

export default BookForm;
