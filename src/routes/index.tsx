import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Alerts from "../components/Alerts";
import Videos from "../views/Videos";

const RoutersMain = () => (
  <Router>
    <Header />
    <Container>
      <Route exact path="/" component={Videos} />
    </Container>
    <Alerts />
  </Router>
);

export default RoutersMain;
