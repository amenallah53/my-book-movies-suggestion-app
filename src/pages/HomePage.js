import '../App.css';
import '../assets/styles/homePageStyle.css'
import Button from '../components/button';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
        <div className="HomePage">
          <main className='mainSection' data-aos="fade-up">
              <div className='mainDiv' id='mainDiv1'>
                  <h1>
                      Searching for entertainment recommendations ?
                  </h1>
                  <div>
                      <Link to="/books" style={{ textDecoration: 'none' }}>
                          <Button text={"search for books"} bgColor={"rgba(255, 255, 255, 0.15)"} borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgba(142, 197, 252, 1)"} />  
                      </Link>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                          <Button text={"search for movies"} bgColor={"rgba(255, 255, 255, 0.15)"} borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgba(142, 197, 252, 1)"} />  
                      </Link>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                          <Button text={"search for TV series"} bgColor={"rgba(255, 255, 255, 0.15)"} borderColor={"rgba(255, 255, 255, 0.2)"} iconColor={"rgba(142, 197, 252, 1)"} />  
                      </Link>
                  </div>
              </div>
          </main>
          <main className='mainSection' data-aos="fade-up">
              <div className='mainDiv' id='mainDiv2'>
                  <div id='div1'>
                      <h1>About this Website</h1>
                      <div>
                          <p>
                              This web application is designed to help you quickly discover great books, movies, and TV series tailored 
                              to your tastes. 
                          </p>
                          <p>
                              Simply choose a category, pick your preferred genre, and optionally describe what you're in the mood for 
                              and our AI-powered recommendation system will suggest personalized options just for you.
                          </p>
                          <p>
                              Whether you're looking for a feel-good comedy, an epic fantasy novel, or a gripping thriller series, this app makes 
                              finding your next favorite story easy and fun.
                          </p>
                      </div>
                  </div>
                  <div id='div2'>
                      <img src={logo}></img>
                  </div>
              </div>
          </main>
        </div>
    );
}

export default HomePage;