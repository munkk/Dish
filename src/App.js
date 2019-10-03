import React, { Component } from "react";
import { compose } from "redux";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import "./App.css";
import Navbar from "components/Navbar";
import AddDish from "components/AddDish";
import List from "components/List";
import { generateDish } from "services/dishesGenerator";
import NavbarImg from "assets/Navbar.png";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffb53a"
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

const styles = theme => ({
  sectionHeader: {
    backgroundImage: `url(${NavbarImg})`,
    minHeight: "300px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    "& div": {
      width: "80%",
      maxWidth: "952px",
      margin: "0 auto",
      position: "relative",
      "& span": {
        position: "absolute",
        left: "0",
        top: "154px",
        fontSize: "50px",
        fontWeight: "bold",
        color: "white"
      }
    }
  },
  sectionCenter: {
    position: "relative",
    width: "80%",
    maxWidth: "952px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    "& > div": {
      textAlign: "initial",
      position: "relative",
      width: "100%",
      margin: "0px 0 40px 0",
      "& > div": {
        position: "absolute",
        width: "9px",
        height: "50px",
        backgroundColor: "#ffb53a",
        top: "31px",
        left: "-17px"
      },
      "& > p": {
        fontSize: "20px",
        fontFamily: "Source Serif Pro Regular",
        position: "absolute",
        top: "50px"
      },
      "& > h1": {
        fontSize: "30px",
        fontWeight: "bold"
      }
    },
    "& button": {
      top: "50px"
    }
  },
  sectionList: {
    width: "80%",
    maxWidth: "952px",
    margin: "0 auto"
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    document.addEventListener("scroll", e => this.runOnScroll(e));

    this.state = {
      listOfDishes: [],
      filterBy: ""
    };
  }

  componentDidMount() {
    this.initializeList();
  }

  initializeList = () => {
    const dishes = this.getRandomTwenty();

    this.setState({
      listOfDishes: dishes
    });
  };

  populateList = () => {
    const dishes = this.getRandomTwenty();

    this.setState(state => ({
      listOfDishes: state.listOfDishes.concat(dishes)
    }));
  };

  getRandomTwenty = () => {
    const dishes = [];
    for (let i = 0; i < 20; i++) {
      const dish = generateDish();
      dishes.push(dish);
    }

    return dishes;
  };

  addNewDish = newDish => {
    this.setState(state => ({
      listOfDishes: [...state.listOfDishes, newDish]
    }));
  };

  runOnScroll = e => {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset >= height - 20) {
      this.populateList();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={customTheme}>
        <div className="App">
          {/* The app is too small to use Redux here */}

          <Navbar onFilterInput={value => this.setState({ filterBy: value })} />
          <section className={classes.sectionHeader}>
            <div>
              <span>Menu</span>
            </div>
          </section>
          <section className={classes.sectionCenter}>
            <div>
              <div></div>
              <h1>Meat Dishes</h1>
              <p>Some of the best dishes meat dishes from worldwide</p>
            </div>
            <AddDish addNewDish={newDish => this.addNewDish(newDish)} />
          </section>

          <section className={classes.sectionList}>
            <List
              listOfDishes={this.state.listOfDishes}
              filterBy={this.state.filterBy}
            />
          </section>
        </div>
      </ThemeProvider>
    );
  }
}

export default compose(withStyles(styles))(App);
