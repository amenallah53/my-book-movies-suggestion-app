import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookSearchingPage from './pages/BookSearchingPage'
import BookResultsPage from './pages/BookResultPage';
import BookInfoPage from './pages/BookInfoPage';
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
        <Route path="/books" element={<BookSearchingPage/>} />
        <Route path="/results" element={<BookResultsPage/>} />
        <Route path="/info" element={<BookInfoPage/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;




