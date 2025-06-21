import '../../components/form/Form.css';
import { /*use,*/ useState } from 'react';
import BasicSelect from './DropDownButton';
import Button from '../button';
import TextField from '@mui/material/TextField';
import CustomNumberInput from './CustomNumberInput';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import { jsonrepair } from "jsonrepair";
//import { Link } from 'react-router-dom';


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
  const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedGenres = listGenre.filter((g) => g.clicked).map((g) => g.genre).join(", ");

  const prompt = `Give me only one book recommendations as a valid JSON array with these fields:
"title", "author", "description", "year", "number_of_volumes", "mood", "poster_url"
Preferences:
genre: ${selectedGenres}
language: ${language}
authors: ${authors}
from: ${fromYear} to: ${toYear}
length: ${bookLength}
Only output valid JSON. No text before or after.
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "phi3",
        prompt: prompt,
        stream: false
      })
    });

    const data = await response.json();
    const responseText = data.response;

    const jsonStart = responseText.indexOf("[");
    const jsonEnd = responseText.lastIndexOf("]") + 1;
    const jsonString = responseText.substring(jsonStart, jsonEnd);

    const fixedJsonString = jsonrepair(jsonString);
    const recommendations = JSON.parse(fixedJsonString);

    console.log(recommendations);
    // display or store recommendations as you wish

  } catch (error) {
    //console.log("Raw extracted JSON:", jsonString);
    console.error("Failed to fetch or parse AI response:", error);
  }
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
          '&:focus-within .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #8ec5fc',
          },
        }}
      />

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
