import '../App.css'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faFilm, faTv } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <nav className='nav-bar'>
            <div className='logo'><img src={logo} alt="logo"></img></div>
            <ul className='nav-links'>
                <li><Link to="/" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faHome} /> home</Link></li>
                <li><Link to="" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faBook} /> books</Link></li>
                <li><Link to="" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faFilm} /> movies</Link></li>
                <li><Link to="" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faTv} /> TV series</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;