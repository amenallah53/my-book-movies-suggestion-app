import './App.css';
import './assets/styles/Form.css'
import './assets/styles/homePageStyle.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookSearchingPage from './pages/books/BookSearchingPage'
import BookResultsPage from './pages/books/BookResultsPage';
import BookInfoPage from './pages/books/BookInfoPage';
import BookHistoryPage from './pages/books/BookHistoryPage';
import MovieSearchingPage from './pages/movies/MovieSearchingPage'
import MovieResultsPage from './pages/movies/MovieResultsPage';
import MovieInfoPage from './pages/movies/MovieInfoPage';
import MovieHistoryPage from './pages/movies/MovieHistoryPage';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createContext, useEffect, useState } from 'react';

AOS.init();
export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
  if (theme === 'light') {
    document.body.style.backgroundImage = 
      `linear-gradient(
        45deg, 
        rgba(142, 197, 252, 1.000) 0.000%,
        rgba(141, 211, 255, 1.000) 25.000%, 
        rgba(161, 216, 255, 1.000) 50.000%, 
        rgba(193, 210, 255, 1.000) 75.000%, 
        rgba(224, 195, 255, 1.000) 100.000%
      )`;

    document.querySelectorAll('.mainDiv').forEach(div => {
      div.style.backgroundColor = `rgba(180, 180, 255, 0.12)`;
      div.style.backdropFilter = `blur(12px)`;
    });

  } else {
    document.body.style.backgroundImage = 
      `linear-gradient(
        45deg,
        rgba(30, 60, 90, 1.0) 0%,
        rgba(35, 70, 100, 1.0) 25%,
        rgba(40, 80, 110, 1.0) 50%,
        rgba(60, 90, 130, 1.0) 75%,
        rgba(80, 60, 120, 1.0) 100%
      )`;

    document.querySelectorAll('.mainDiv').forEach(div => {
      div.style.backgroundColor = `rgba(255, 255, 255, 0.06)`;
      div.style.backdropFilter = `blur(8px)`;
    });

  }
}, [theme]);


  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/books-recommendations" element={<BookSearchingPage/>} />
          <Route path="/books-recommendations/results" element={<BookResultsPage/>} />
          <Route path="/books-recommendations/results/book-info" element={<BookInfoPage/>} />
          <Route path="/books-history" element={<BookHistoryPage/>} />
          <Route path="/movies-recommendations" element={<MovieSearchingPage/>} />
          <Route path="/movies-recommendations/results" element={<MovieResultsPage/>} />
          <Route path="/movies-recommendations/results/movie-info" element={<MovieInfoPage/>} />
          <Route path="/movies-history" element={<MovieHistoryPage/>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeContext.Provider>
  )
}

export default App;




