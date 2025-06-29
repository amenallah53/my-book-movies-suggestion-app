import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookSearchingPage from './pages/books/BookSearchingPage'
import BookResultsPage from './pages/books/BookResultsPage';
import BookInfoPage from './pages/books/BookInfoPage';
import MovieSearchingPage from './pages/movies/MovieSearchingPage'
import MovieResultsPage from './pages/movies/MovieResultsPage';
import MovieInfoPage from './pages/movies/MovieInfoPage';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/books-recommendations" element={<BookSearchingPage/>} />
        <Route path="/books-recommendations/results" element={<BookResultsPage/>} />
        <Route path="/books-recommendations/results/book-info" element={<BookInfoPage/>} />
        <Route path="/movies-recommendations" element={<MovieSearchingPage/>} />
        <Route path="/movies-recommendations/results" element={<MovieResultsPage/>} />
        <Route path="/movies-recommendations/results/movie-info" element={<MovieInfoPage/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;




