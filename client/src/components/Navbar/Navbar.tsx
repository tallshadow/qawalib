import React from "react";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <div className="navbar-logo">
            <Link to="/" className="navbar-brand">
              Namadej
            </Link>
          </div>
          <div className="navbar-links">
            <Button
              color="inherit"
              component={Link}
              to="/"
              className="navbar-button"
            >
              الرئيسية
            </Button>
            {/* <Button
              color="inherit"
              component={Link}
              to="/categories"
              className="navbar-button"
            >
              Categories
            </Button> */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
