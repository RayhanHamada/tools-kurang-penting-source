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
          <span>Tools Kurang Penting</span>
        </a>
        <span style={{ textAlign: "end" }}>Anjay Mabar</span>
      </nav>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/tabulasi">
          <Tabulation />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
