import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Tabulation from "./pages/examples/Tabulation";

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <a className="navbrand" href=".">
          <span>Muffyn Tools</span>
        </a>
        <p>
          <b>M</b>aybe <b>U</b>seful <b>F</b>ounded <b>F</b>reazy <b>Y</b>our{" "}
          <b>N</b>
          owadays <b>T</b>ools
        </p>
      </nav>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/use-tool/:tool">
          <br />
          <Tabulation />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
