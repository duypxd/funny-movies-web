import { Container, Form, Navbar } from "react-bootstrap";
import { BsYoutube } from "react-icons/bs";

import LoginForm from "./LoginForm";
import "../css/header.css";

const Header = () => {
  const onLoadPage = () => {
    window.location.href = "/";
  };
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top">
      <Container>
        <Navbar.Brand onClick={onLoadPage} className="pointer">
          <BsYoutube size={40} />
          <Form.Label column="lg" className="p-2 pointer" lg={2}>
            Funny Movies
          </Form.Label>
        </Navbar.Brand>
        <LoginForm />
      </Container>
    </Navbar>
  );
};

export default Header;
