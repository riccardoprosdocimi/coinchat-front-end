import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {logoutThunk} from "../services/users-thunks";
import {LinkContainer} from "react-router-bootstrap";

function NavigationBar() {
    const {currentUser} = useSelector(state => state.users);
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    const active = paths[1];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutThunk());
        navigate('/')
    };

    if (active === 'login') {
        return null;
    } else {
        return (
            <>
                {['md'].map((expand) => (
                    <Navbar key={expand}
                            expand={expand}
                            className="wd-nav-bar-bg-font">
                        <Container fluid>
                            <Navbar.Brand href="/"
                                          style={{"color" : "#ffc300"}}>
                                CoinChat
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end">
                                <Offcanvas.Header closeButton
                                                  className="wd-nav-bar-bg-font"
                                                  style={{"color" : "#ffc300"}}>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        CoinChat
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-start flex-grow-1 my-auto">
                                        <LinkContainer to="/">
                                            <Nav.Link className={`wd-nav-bar`} active={
                                                active === 'home'
                                            }>
                                                Home
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="profile">
                                            <Nav.Link className={`wd-nav-bar`} active={
                                                active === 'profile'
                                            }>
                                                Profile
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="search">
                                            <Nav.Link className={`wd-nav-bar`} active={
                                                active === 'search'
                                            }>
                                                Search
                                            </Nav.Link>
                                        </LinkContainer>
                                        {/*<NavDropdown*/}
                                        {/*    title="Dropdown"*/}
                                        {/*    id={`offcanvasNavbarDropdown-expand-${expand}`}>*/}
                                        {/*    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>*/}
                                        {/*    <NavDropdown.Item href="#action4">*/}
                                        {/*        Another action*/}
                                        {/*    </NavDropdown.Item>*/}
                                        {/*    <NavDropdown.Divider />*/}
                                        {/*    <NavDropdown.Item href="#action5">*/}
                                        {/*        Something else here*/}
                                        {/*    </NavDropdown.Item>*/}
                                        {/*</NavDropdown>*/}
                                    </Nav>
                                    {
                                        !currentUser &&
                                        <Nav>
                                            <LinkContainer to="register">
                                                <Nav.Link className="wd-nav-bar" active={
                                                    active === 'register'
                                                }>
                                                    Register
                                                </Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="login">
                                                <Nav.Link className="wd-nav-bar">
                                                    Login
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Nav>
                                    }
                                    {
                                        currentUser &&
                                        <DropdownButton
                                            className="wd-dropdown-btn"
                                            align="end"
                                            title={<img className="rounded-circle border"
                                                        height={30}
                                                        width={30}
                                                        src={currentUser && `/images/p${currentUser.avatar}.jpg`}
                                                        alt="user's avatar"/>}
                                            id="dropdown-menu-align-end"
                                            autoClose={true}>
                                            {
                                                currentUser.role === 'ADMIN' &&
                                                <LinkContainer to="edit-users" >
                                                    <Dropdown.Item eventKey="1" active={
                                                        active === 'edit-users'
                                                    }>
                                                        Edit Users
                                                    </Dropdown.Item>
                                                </LinkContainer>
                                            }
                                            <LinkContainer to="bloglist">
                                                <Dropdown.Item eventKey="2" active={
                                                    active === 'bloglist'
                                                }>
                                                    Blog
                                                </Dropdown.Item>
                                            </LinkContainer>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item eventKey="4"
                                                           onClick={handleLogout}>
                                                Logout
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    }
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                ))}
            </>
        );
    }
}
export default NavigationBar;