import '../../App.css';
import '../../assets/styles/bookSearchingPageStyle.css';
import BookForm from '../../components/form/BookForm';

function BookSearchingPage() {
  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1>
                      Searching for book suggestions ?
                </h1>
                <h3>This is your perfect place</h3>
                <div className='mainDiv' id='optionDiv'>
                  <BookForm/>
                </div>
        </main>
    </div>
  );
}

export default BookSearchingPage;