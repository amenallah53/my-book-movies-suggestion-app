import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import twitter from '../../assets/images/twitter.png'
import linkedin from '../../assets/images/linkedin.png'
import github from '../../assets/images/github.png'


function Footer() {
    return (
        <div className='footer-div'>
            <footer className='footer'>
                <div className='contact'>
                    <h3>Contact us</h3>
                    <p>amenkalai53@gmail.com</p>
                    <p>+216 50 748 248</p>
                </div>
                <div className='socials'>
                    <h3>Our Socials</h3>
                    <div>
                        <a href='https://www.facebook.com/amen.kalai.22/' target='_blank'>
                            <img src={facebook}></img>
                        </a>
                        <a href='https://www.instagram.com/amenallahkalai/' target='_blank'>
                            <img src={instagram}></img>
                        </a>
                        <a href='https://x.com/AmenKalai' target='_blank'>
                            <img src={twitter}></img>
                        </a>
                        <a href='https://www.linkedin.com/in/amen-allah-kalai-024719327/' target='_blank'>
                            <img src={linkedin}></img>
                        </a>
                        <a href='https://github.com/amenallah53' target='_blank'>
                            <img src={github}></img>
                        </a>
                    </div>
                </div>
                <div className='copy-right'>
                    <p>{new Date().getFullYear()} Amenallah KALAI.</p>
                    <p><FontAwesomeIcon icon={faCopyright} /> All rights reserved.</p>
                </div>
            </footer>
        </div>
        
    );
}

export default Footer;