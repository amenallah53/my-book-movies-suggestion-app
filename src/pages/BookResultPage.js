import '../App.css';
import '../assets/styles/bookCardStyle.css';
import BookCard from '../components/BookCard';
import { useLocation } from 'react-router-dom';

function BookResultsPage() {
  const location = useLocation();
  const { recommendations , image_urls } = location.state;
  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1>
                      results
                </h1>
                <h3>These are the results our AI model provided for you</h3>
                <div className='mainDiv' id='resultDiv'>
                  <div className="list-results">
                    {recommendations.map((element, index) => (                                                  /*() => handleGenreClick(index)*/
                      <BookCard key={index} book={element} image={image_urls[index]}/>
                    ))}
                  </div>
                </div>
        </main>
    </div>
  );
}

export default BookResultsPage;