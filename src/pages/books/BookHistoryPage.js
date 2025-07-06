import { useEffect, useState } from 'react';
import '../../App.css';
import '../../assets/styles/bookCardStyle.css';
import BookCard from '../../components/BookCard';

function BookHistoryPage() {
  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState([]);

  const getAllBooks = async () => {
    try {
        const response = await fetch("http://localhost:5000/books/get-books");
        if (response.status === 200) {
        const books = await response.json();
        setBookList(books); // set state here
        } else {
        setBookList([]);
        }
    } catch (error) {
        console.error("Error with getting books:", error);
        setBookList([]);
    }
  };

  useEffect(() => {
    getAllBooks();
    console.log(bookList)
  }, []);

  return (
    <div className="BookSearchingPage">
        <main className='mainSection' id='mainSection' data-aos="fade-down">
                <h1>
                      Saved books
                </h1>
                <input type='text' placeholder='Search to read books by title...' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <div className='mainDiv' id='resultDiv'>
                    <div className="list-results">
                        {bookList.map((element, index) => (
                            <BookCard key={index} book={element} image={element.image}/>
                        ))}
                    </div>
                </div>
                

        </main>
    </div>
  );
}

export default BookHistoryPage;