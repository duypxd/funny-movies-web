import { Container, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";

import LoginForm from "./LoginForm";
import "../css/nav.css";

const Header = () => (
  <Navbar bg="dark" variant="dark" className="sticky-nav">
    <Container>
      <Navbar.Brand as={Link} to="/">
        <BsYoutube size={40} />
        <Form.Label column="lg" className="p-2" lg={2}>
          Funny Movies
        </Form.Label>
      </Navbar.Brand>
      <LoginForm />
    </Container>
  </Navbar>
);

export default Header;
