import React, { Component } from "react";
import "./App.css";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import Navbar from "components/Navbar";
import AddDish from "components/AddDish";
import List from "components/List";
import { generateDish } from "services/dishesGenerator";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F9AFF"
    },
    secondary: {
      main: "#f44336"
    }
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
    return (
      <ThemeProvider theme={customTheme}>
        <div className="App">
          {/* The app is too small to use Redux here */}

          <Navbar onFilterInput={value => this.setState({ filterBy: value })} />

          <AddDish addNewDish={newDish => this.addNewDish(newDish)} />

          <List
            listOfDishes={this.state.listOfDishes}
            filterBy={this.state.filterBy}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
