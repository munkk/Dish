import React, { Component } from "react";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Dish from "components/Dish";

const styles = theme => ({
  root: {
    display: "flex"
  },
  dishWrapper: {
    marginBottom: "10px"
  },
  "@media (max-width: 1199px)": {
    root: {
      display: "flex",
      justifyContent: "space-around"
    },
    dishWrapper: {
      display: "flex",
      justifyContent: "space-around"
    }
  },
  "@media (min-width: 960px) and (max-width: 1199px)": {
    dishWrapper: {
      maxWidth: "50%"
    }
  }
});

class List extends Component {
  filter = dish => {
    if (!this.props.filterBy) return true;

    const { name } = dish;
    const searchable = dish.ingredients.map(ingredient => ingredient.name);
    searchable.push(name);

    const result = searchable.filter(item => {
      return item.toLowerCase().startsWith(this.props.filterBy.toLowerCase());
    });

    return result.length;
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          className={classes.root}
          justify="space-between"
          spacing={2}
        >
          {this.props.listOfDishes
            .filter(dish => this.filter(dish))
            .map((dish, idx) => (
              <Grid
                key={idx}
                className={classes.dishWrapper}
                item
                xs={12}
                md={4}
                lg={4}
              >
                <Dish dishName={dish.name} />
              </Grid>
            ))}
        </Grid>
      </>
    );
  }
}

export default compose(withStyles(styles))(List);
