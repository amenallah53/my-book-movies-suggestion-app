import '../../components/form/Form.css';
import { use, useState } from 'react';
import BasicSelect from './DropDownButton';
import Button from '../button';
import TextField from '@mui/material/TextField';
import CustomNumberInput from './CustomNumberInput';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';


function BookForm() {
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

  const [value,setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // collect form values here and trigger your AI fetch
  };

  //setListGenre(listGenre[key].clicked = !listGenre[key].clicked);

  return (
    <form onSubmit={handleSubmit} className='formClass'>
      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Genre</FormLabel>
      <div className="genre-options">
        {listGenre.map((element, index) => (
          <div key={index} className="genre">
            {element.genre}
          </div>
        ))}
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Language</FormLabel>
      <BasicSelect/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Author(s)</FormLabel>
      <TextField
        id="outlined-basic"
        label="Enter preferred author"
        variant="outlined"
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
        <CustomNumberInput text="From"/>
        <CustomNumberInput text="To"/>
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Book length</FormLabel>
      <RowRadioButtonsGroup/>
      <Button text={"Get Recommendations"} bgColor={"rgba(126, 0, 115, 0.48)"} 
      borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgb(210, 0, 255)"}/>
    </form>
  );
}

export default BookForm;
