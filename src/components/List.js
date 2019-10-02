import React, { Component } from "react";
import { compose } from "redux";

import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr"
  },
  card: {
    margin: "20px"
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
        <div className={classes.root}>
          {this.props.listOfDishes
            .filter(dish => this.filter(dish))
            .map(dish => (
              <Card className={classes.card}>
                <p>{dish.name}</p>
                <p>
                  Ingredients:
                  {dish.ingredients
                    .map(ingredient => ingredient.name)
                    .join(", ")}
                </p>
                <p>
                  Weight:
                  {dish.ingredients
                    .map(ingredient => ingredient.weight)
                    .reduce((a, b) => a + b, 0)}
                </p>
              </Card>
            ))}
        </div>
      </>
    );
  }
}

export default compose(withStyles(styles))(List);
