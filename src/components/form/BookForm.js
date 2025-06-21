import '../../assets/styles/Form.css';
import { /*use,*/ useState } from 'react';
import BasicSelect from './DropDownButton';
//import Button from '../button';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
//import CustomNumberInput from './CustomNumberInput';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import { jsonrepair } from "jsonrepair";
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


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
  const [extraDescription,setExtraDescription] = useState('');
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
    language of the book: ${language}
    author(s): ${authors}
    years of publish from: ${fromYear} to: ${toYear}
    length: ${bookLength}
    extra details : ${extraDescription}
    don't mind empty preferences and Respond ONLY with JSON array. 
    No markdown, no explanation, no extra text.`;

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
      <Input 
        size="lg"
        placeholder="Enter preferred author..." 
        onChange={(e) => setAuthors(e.target.value)}
        sx={{width: '300px',}}
      />

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Publication Year Range</FormLabel>
      <div id='inputNumbersDiv'>
        <Input 
          type="number"
          placeholder="From year" 
          size="lg"
          onChange={(e) => setFromYear(e.target.value)}
          sx={{width: '300px',}}
        />
        <Input 
          type="number"
          size="lg"
          placeholder="To year" 
          onChange={(e) => setToYear(e.target.value)}
          sx={{width: '300px',}}
        />
      </div>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Book length</FormLabel>
      <RowRadioButtonsGroup value={bookLength} onChange={setBookLength}/>
      <Textarea size="lg" name="Outlined" onChange={(e) => setExtraDescription(e.target.value)} placeholder="Add other more description for more specification..." variant="outlined" minRows = {3} />
      {/*{isLoading && <p style={{ color: 'white', fontWeight: 'bold', fontSize:'20px' }}>Fetching recommendation...</p>}
      <Button  text={"Get Recommendations"} bgColor={"rgba(126, 0, 115, 0.48)"} 
      borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgb(210, 0, 255)"}/>*/}
      <Button type="submit" sx={{width:"300px"}} size="lg" /*disabled={isLoading}*/ loading={isLoading} endDecorator={<KeyboardArrowRight />} >
        Get Recommendations
      </Button>
      
    </form>
  );
}

export default BookForm;
