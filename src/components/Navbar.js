import React, { Component } from "react";
import { compose } from "redux";

import { fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

import Background from "assets/Background.svg";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  logo: {
    position: "absolute",
    left: "3vw",
    margin: "15px 0 0 40px",
    color: "white"
  },
  appBar: {
    height: "200px",
    boxShadow: "none",
    backgroundImage: `url(${Background})`,
    backgroundColor: "#f9fafc",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPositionY: "calc(5px - 2vw)"
  },
  patchBehind: {
    width: "100%",
    height: "55px",
    backgroundColor: "#1F9AFF"
  },
  search: {
    position: "absolute",
    width: "300px",
    top: "10px",
    right: "30px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    color: "white"
  },
  searchIcon: {
    color: "white",
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class Navbar extends Component {
  filter = e => {
    this.props.onFilterInput(e.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        <div className={classes.patchBehind}>
          <span className={classes.logo}>Dish</span>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={this.filter}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </div>

        <Toolbar variant="dense"></Toolbar>
      </AppBar>
    );
  }
}

export default compose(withStyles(styles))(Navbar);
