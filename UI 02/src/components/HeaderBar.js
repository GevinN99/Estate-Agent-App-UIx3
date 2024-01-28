import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {CiSearch} from "react-icons/ci";

const HeaderBar = () => {
    return (
        <Navbar style={{backgroundColor: "#304D30"}} expand="lg">
            <Navbar.Brand href="#home">
                <img src="./images/logoIcon.jpg" alt="Logo" width="50" height="50" className="d-inline-block align-top rounded-circle" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav>
                    <Nav.Link href="#home" className="h1 text-light"><b>Believe in Finding it</b></Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#link" style={{color: "#FFFFFF", fontSize:"20px"}}><CiSearch className="m-2" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default HeaderBar;
