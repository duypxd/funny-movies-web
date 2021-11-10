import { Container, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";

import HeaderAuth from "./HeaderAuth";

const Header = () => (
  <Navbar bg="danger" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">
        <BsYoutube size={40} />
        <Form.Label column="lg" className="p-2" lg={2}>
          Funny Movies
        </Form.Label>
      </Navbar.Brand>
      <HeaderAuth />
    </Container>
  </Navbar>
);

export default Header;
