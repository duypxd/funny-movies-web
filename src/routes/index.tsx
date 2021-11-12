import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Alerts from "../components/Alerts";
import Videos from "../views/Movies";

const RoutersMain = () => (
  <Router>
    <Header />
    <Container className="mt-5 pt-3">
      <Route exact path="/" component={Videos} />
    </Container>
    <Alerts />
  </Router>
);

export default RoutersMain;
