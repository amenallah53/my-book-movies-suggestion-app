import '../../assets/styles/Form.css';
import { /*use,*/ useState } from 'react';
import BasicSelect from './DropDownButton';
import Button from '../button';
import TextField from '@mui/material/TextField';
import CustomNumberInput from './CustomNumberInput';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import { jsonrepair } from "jsonrepair";
import { useNavigate } from 'react-router-dom';



function BookForm() {
  //state variables
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);


  /* arrow function */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted.");

    const selectedGenres = listGenre.filter((g) => g.clicked).map((g) => g.genre).join(", ");

    const prompt = `Give me a book recommendation as valid strict JSON object, exactly like this:
    {
      "title": "",
      "author": "",
      "description": "",
      "year": "",
      "mood": "",
    }
    Preferences:
    genre: ${selectedGenres}
    language: ${language}
    authors: ${authors}
    from: ${fromYear} to: ${toYear}
    length: ${bookLength}
    Respond ONLY with JSON array. No markdown, no explanation, no extra text.`;

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "phi3",
          "prompt": prompt,
          "stream": false,
          "options": {
            "temperature": 0.2,
            "stop": ["]"]
          }
        })
      });

    const data = await response.json();
    let responseText = data.response.trim();

    // Quick fallback fix if model forgot closing bracket
    if (!responseText.endsWith("]")) {
      responseText += "]";
    }

    //console.log("RAW AI Response:", responseText);

    const fixedJsonString = jsonrepair(responseText);
    const recommendations = JSON.parse(fixedJsonString);

    console.log(recommendations);

    // ✅ navigate to /results with recommendations
    navigate('/results', { state: { recommendations } });

    } catch (error) {
      //console.log("Raw extracted JSON:", jsonString);
      console.error("Failed to fetch or parse AI response:", error);
    } finally{
      setIsLoading(false);
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
      {isLoading && <p style={{ color: 'white', fontWeight: 'bold', fontSize:'20px' }}>Fetching recommendation...</p>}
      <Button  text={"Get Recommendations"} bgColor={"rgba(126, 0, 115, 0.48)"} 
      borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgb(210, 0, 255)"}/>
      
    </form>
  );
}

export default BookForm;
