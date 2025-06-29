import '../../App.css';
import '../../assets/styles/bookSearchingPageStyle.css';
import MovieForm from '../../components/form/MovieForm';

function MovieSearchingPage() {
  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1 style={{letterSpacing:0}}>
                      Searching for movie suggestions ?
                </h1>
                <h3>This is your perfect place</h3>
                <div className='mainDiv' id='optionDiv'>
                  <MovieForm/>
                </div>
        </main>
    </div>
  );
}

export default MovieSearchingPage;