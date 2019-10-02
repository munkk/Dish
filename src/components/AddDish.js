import React, { Component } from "react";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({
  formContainer: {
    padding: "50px",
    textAlign: "center",
    width: "700px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    margin: "0 auto"
  },
  ingredientsContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  addIngredientButton: {
    color: "white",
    marginTop: "30px"
  },
  saveDishButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "10px",
    color: "white"
  }
});

const AddDishButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
}))(Button);

const StyledListItem = withStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#1F9AFF",
    color: "white",
    margin: "5px"
  }
})(ListItem);

class AddDish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogIsOpen: false,
      ingredients: [],
      dishName: "",
      ingredientName: "",
      ingredientWeight: 0
    };
  }

  addIngredient = () => {
    if (!this.state.ingredientName || !this.state.ingredientWeight) return;

    const ingredient = {
      name: this.state.ingredientName,
      weight: this.state.ingredientWeight
    };

    this.setState(state => ({
      ingredients: [...state.ingredients, ingredient],
      ingredientName: "",
      ingredientWeight: 0
    }));
  };

  saveDish = () => {
    if (!this.state.dishName && !this.state.ingredients.length) return;

    const dish = {
      name: this.state.dishName,
      ingredients: this.state.ingredients
    };

    this.props.addNewDish(dish);
    this.closeDialog();
    this.invalidate();
  };

  openDialog = () => {
    this.setState({
      dialogIsOpen: true
    });
  };

  closeDialog = () => {
    this.setState({
      dialogIsOpen: false
    });
  };

  invalidate = () => {
    this.setState({
      ingredients: [],
      dishName: "",
      ingredientName: "",
      ingredientWeight: 0
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <AddDishButton onClick={this.openDialog}>
          Add a new dish +
        </AddDishButton>

        <Dialog
          maxWidth="md"
          aria-labelledby="simple-dialog-title"
          open={this.state.dialogIsOpen}
        >
          <div className={classes.formContainer}>
            <DialogTitle id="simple-dialog-title">Add a new dish</DialogTitle>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="name"
                label="Name"
                value={this.state.dishName}
                onChange={e => this.setState({ dishName: e.target.value })}
                margin="normal"
              />
              <p>Ingredients: </p>
              <List>
                {this.state.ingredients.map((ingredient, idx) => (
                  <StyledListItem color="primary">
                    <span>{ingredient.name}</span>
                    <span>{ingredient.weight}</span>
                  </StyledListItem>
                ))}
              </List>
              <div className={classes.ingredientsContainer}>
                <TextField
                  id="ingredient"
                  label="Ingredient"
                  value={this.state.ingredientName}
                  onChange={e =>
                    this.setState({ ingredientName: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  id="weight"
                  label="Weight"
                  value={this.state.ingredientWeight}
                  onChange={e =>
                    this.setState({ ingredientWeight: +e.target.value })
                  }
                  margin="normal"
                />
              </div>
            </form>
            <Button
              color="primary"
              variant="contained"
              onClick={this.addIngredient}
              className={classes.addIngredientButton}
            >
              Add Ingredient +
            </Button>
            <Button
              onClick={this.saveDish}
              color="primary"
              variant="contained"
              className={classes.saveDishButton}
            >
              Save
            </Button>
          </div>
        </Dialog>
      </>
    );
  }
}

export default compose(withStyles(styles))(AddDish);
