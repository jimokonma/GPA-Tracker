import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CgpTracker from "./components/CgpTracker";
import Dashboard from "./components/Dashboard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Grid } from "@material-ui/core";
function App() {
  return (
    <div>
      <Router>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Grid container justify="space-evenly" style={{ width: "80%" }}>
              <Grid item>
                <Link to="/">
                  <Typography variant="h6">CGP Tracker</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Link to="/dashboard">
                <Button
                  variant="text"
                  startIcon={<DashboardIcon />}
                  style={{ color: "white" }}
                >
                  Dashboard
                </Button>
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={CgpTracker} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}
export default App;
