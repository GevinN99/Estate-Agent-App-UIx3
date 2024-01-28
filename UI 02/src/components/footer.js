import '../App.css';
import { Container } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-center" style={{backgroundColor: "#304D30", color:"white"}}>
            <Container fluid className="p-4">
                <section className="mb-4 ">
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaFacebookF style={{color:"white"}}/></a>
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaTwitter style={{color:"white"}}/></a>
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaGoogle style={{color:"white"}}/></a>
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaInstagram style={{color:"white"}}/></a>
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaLinkedinIn style={{color:"white"}}/></a>
                    <a className="btn btn-outline btn-floating m-1" href="#!" role="button"><FaGithub style={{color:"white"}}/></a>
                </section>
                <section className="mb-4">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                        voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta,
                        aliquam sequi voluptate quas.</p>
                </section>
            </Container>
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2020 Copyright: <a href="#!" style={{color:"white"}}>GreenHouse.com</a>
            </div>
        </footer>
    );
}

export default Footer;
