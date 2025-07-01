import '../../assets/styles/Form.css';
import { useState } from 'react';
import BasicSelect from './DropDownButton';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CheckBoxButtonsGroup from './CheckBoxButtonsGroup';
import FormLabel from '@mui/material/FormLabel';
import { data, useNavigate } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


function MovieForm() {
  //state variables
  const navigate = useNavigate();
  const [listGenre, setListGenre] = useState([
    { genre: 'Action', clicked: false },
    { genre: 'Animation', clicked: false },
    { genre: 'Biography', clicked: false },
    { genre: 'Comedy', clicked: false },
    { genre: 'Crime', clicked: false },
    { genre: 'Crime Drama', clicked: false },
    { genre: 'Dark Comedy', clicked: false },
    { genre: 'Documentary', clicked: false },
    { genre: 'Drama', clicked: false },
    { genre: 'Fantasy', clicked: false },
    { genre: 'Horror', clicked: false },
    { genre: 'Legal Drama', clicked: false },
    { genre: 'Musical', clicked: false },
    { genre: 'Mystery', clicked: false },
    { genre: 'Film Noir', clicked: false },
    { genre: 'Gangster', clicked: false },
    { genre: 'Western', clicked: false },
    { genre: 'Romance', clicked: false },
    { genre: 'Sports', clicked: false },
    { genre: 'Thriller', clicked: false },
    { genre: 'Contemporary Fantasy', clicked: false },
    { genre: 'Historical Fiction', clicked: false },
    { genre: 'Psychological Thriller', clicked: false },
    { genre: 'Science Fiction', clicked: false },
  ]);
  
  const [language,setLanguage] = useState('');
  const [director,setDirector] = useState('');
  const [fromYear,setFromYear] = useState('');
  const [toYear,setToYear] = useState('');
  const [recognition, setRecognition] = useState([]);
  const [extraDescription,setExtraDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //this one return the image url in form of `https://covers.openlibrary.org/b/id/${image_id}-L.jpg`
  //in this function we get the image_id from the backend 
  const getImageUrls = async (recommendation) => {
    try {
      const response = await fetch("http://localhost:5000/api/get-image/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: recommendation.title,
          director: recommendation.director,
        }),
      });

      // Better error handling
      if (!response.ok) {
        console.warn(`Image not found for: ${recommendation.title}`);
        return null; /*for test */
      }

      const data = await response.json();
      return data.movie_poster_backgound;

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
      const response = await fetch("http://localhost:5000/api/recommend/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedGenres,
          language,
          director,
          fromYear,
          toYear,
          recognition,
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
      navigate('/movies-recommendations/results', { state: { recommendations , image_urls } });

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
      <BasicSelect isLoading={isLoading} value={language} onChange={setLanguage}/>

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Director</FormLabel>
      <Input 
        disabled={isLoading}
        size="lg"
        placeholder="Enter preferred director..." 
        onChange={(e) => setDirector(e.target.value)}
        sx={{width: '300px',}}
      />

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Release Year Range</FormLabel>
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

      <FormLabel className="labelClass" sx={{fontSize: '40px',fontWeight: 500}}>Recognition & Reputation</FormLabel>
      <CheckBoxButtonsGroup isLoading={isLoading} value={recognition} onChange={setRecognition}/>
      <Textarea disabled={isLoading} size="lg" name="Outlined" onChange={(e) => setExtraDescription(e.target.value)} placeholder="Add other more description for more specification..." variant="outlined" minRows = {3} />
      <Button type="submit" sx={{width:"300px"}} size="lg" loading={isLoading} endDecorator={<KeyboardArrowRight />} >
        Get Recommendations
      </Button>
      
    </form>
  );
}

export default MovieForm;
