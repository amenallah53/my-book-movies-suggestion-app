import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookSearchingPage from './pages/BookSearchingPage'
//import BookResultsPage from './pages/MovieSearchingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/books" element={<BookSearchingPage />} />
        {/*<Route path="/results" element={<BookResultsPage />} />*/}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;




