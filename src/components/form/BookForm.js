import '../../assets/styles/Form.css';
import { /*use,*/ useState } from 'react';
import BasicSelect from './DropDownButton';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import { data, useNavigate } from 'react-router-dom';
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

  //this one return the image url in form of `https://covers.openlibrary.org/b/id/${image_id}-L.jpg`
  //in this function we get the image_id from the backend 
  const getImageUrls = async (recommendation) => {
    try {
      const response = await fetch("http://localhost:5000/api/getImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: recommendation.title,
          author: recommendation.author,
        }),
      });

      // Better error handling
      if (!response.ok) {
        console.warn(`Image not found for: ${recommendation.title}`);
        return `https://covers.openlibrary.org/b/id/${11481354}-L.jpg`; /*for test */
      }

      const data = await response.json();
      return data.image_id 
        ? `https://covers.openlibrary.org/b/id/${data.image_id}-L.jpg`
        : `https://covers.openlibrary.org/b/id/${11481354}-L.jpg`; /*for test */

    } catch (err) {
      console.error("Error fetching image:", err);
      return null;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted.");

    const selectedGenres = listGenre.filter((g) => g.clicked).map((g) => g.genre).join(", ");

    try {
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedGenres,
          language,
          authors,
          fromYear,
          toYear,
          bookLength,
          extraDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const recommendations = data.recommendations;
      
      const image_urls = await Promise.all(
        recommendations.map(async (recommendation, index) => {
          return await getImageUrls(recommendation);
        })
      );

      console.log("recommendations ",recommendations);
      console.log("image_urls ",image_urls);
      navigate('/results', { state: { recommendations , image_urls } });

    } catch (err) {
      console.error("Error submitting form:", err);
      console.log("raw : ",data);
      alert("Failed to get recommendations from backend.");
    } finally {
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
