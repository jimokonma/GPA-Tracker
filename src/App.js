import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CgpTracker from "./components/CgpTracker";
import Dashboard from "./components/Dashboard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
function App() {
  return (
    <div>
      <Router>
        <AppBar color="primary">
          <Toolbar>
            <Link to="/">
              <Typography variant="h6">CGP Tracker</Typography>
            </Link>
            <Link to="/dashboard">
              <Button variant="text" color={"secondary"}>
                Dashboard
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={CgpTracker} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}
export default App;
