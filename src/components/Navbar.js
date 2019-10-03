import React, { Component } from "react";
import { compose } from "redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { lighten, withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import Logo from "assets/Logo.png";
import User from "assets/User.svg";
import UserBlack from "assets/UserBlack.svg";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  logo: {
    width: "70px"
  },
  userInfo: {
    position: "absolute",
    right: 0,
    "& span": {
      position: "relative",
      top: "-3px",
      left: "48px",
      transition: "0.5s"
    }
  },
  appBar: {
    display: "flex",
    boxShadow: "none",
    backgroundColor: "transparent",
    transition: "background-color 0.7s"
  },
  toolbar: {
    width: "80%",
    height: "100px",
    maxWidth: "952px",
    margin: "0 auto"
  },
  center: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  links: {
    fontSize: "17px",
    display: "flex",
    justifyContent: "space-around",
    width: "40%",
    "& > a": {
      color: "white",
      transition: "0.5s",
      fontWeight: "bold",
      borderRadius: "5px",
      height: "34px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  patchBehind: {
    width: "100%",
    height: "55px",
    backgroundColor: "#1F9AFF"
  },
  search: {
    position: "relative",
    left: "40px",
    heigh: "43px",
    width: "305px",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    backgroundColor: "white",
    color: "#262626",
    border: "1.5px solid #F8F8F8",
    borderRadius: "6px"
  },
  searchIcon: {
    color: "black",
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    right: "0",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "90%"
  },
  inputInput: {
    height: "26px",
    fontSize: "15px",
    padding: "8px",
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  "@media (max-width: 1155px)": {
    center: {
      display: "none"
    }
  }
});

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrolledDown: false
    };

    this.canStyle = true;

    document.addEventListener("scroll", e => this.runOnScroll(e));
  }

  runOnScroll = () => {
    if (window.pageYOffset > 0) {
      if (this.canStyle) {
        this.setState({
          isScrolledDown: true
        });
      }
      this.canStyle = false;
    } else {
      this.setState({
        isScrolledDown: false
      });

      this.canStyle = true;
    }
  };

  filter = e => {
    this.props.onFilterInput(e.target.value);
  };

  renderLink = (idx, link) => {
    if (idx === 1) {
      return (
        <Link
          key={idx}
          style={{
            color: this.state.isScrolledDown ? "#ffb53a" : "white",
            backgroundColor: this.state.isScrolledDown
              ? lighten("#ffb53a", 0.8)
              : "#ffb53a",
            width: "71px",
            margin: "0 3px"
          }}
        >
          {link}
        </Link>
      );
    } else {
      return (
        <Link
          key={idx}
          style={{
            color: this.state.isScrolledDown ? "black" : "white"
          }}
        >
          {link}
        </Link>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar
        ref={this.navRef}
        style={{
          backgroundColor: this.state.isScrolledDown ? "white" : "transparent"
        }}
        className={classes.appBar}
        position="fixed"
      >
        <Toolbar className={classes.toolbar}>
          <img src={Logo} className={classes.logo} />

          <div className={classes.center}>
            <div className={classes.links}>
              {["Our Restaurant", "Menu", "Contact us"].map((link, idx) =>
                this.renderLink(idx, link)
              )}
            </div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={this.filter}
                placeholder="Try « Chicken cotoletta »"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>

          <div className={classes.userInfo}>
            <span
              style={{
                color: this.state.isScrolledDown ? "black" : "white"
              }}
            >
              John C.
            </span>
            <img
              src={this.state.isScrolledDown ? UserBlack : User}
              className={classes.logo}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(withStyles(styles))(Navbar);
