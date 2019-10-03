import React, { Component } from "react";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";

import Plus from "assets/Plus.svg";
import PlusYellow from "assets/PlusYellow.svg";
import Camera from "assets/Camera.svg";
import Menu from "assets/Menu.svg";

const styles = theme => ({
  addDishButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "48px",
    width: "196px",
    color: "white",
    boxShadow: "none",
    textTransform: "inherit",
    "& span": {
      position: "relative",
      left: "-6px"
    },
    "& img": {
      position: "relative",
      left: "15px"
    }
  },
  dialogPaper: {
    maxHeight: "96vh"
  },
  formContainer: {
    padding: "0px",
    textAlign: "center",
    width: "960px",
    "& > header": {
      textAlign: "initial",
      width: "100%",
      backgroundColor: "#F4F4F4",
      margin: "0 auto",
      position: "relative",
      "& > div": {
        padding: "70px 140px 111px",
        position: "relative"
      },
      "& span": {
        position: "absolute",
        bottom: "11px",
        color: "#707070",
        bottom: "-37px",
        "& img": {
          position: "absolute"
        }
      }
    },
    "& > header > div > h3": {
      fontWeight: "500",
      position: "absolute",
      top: "117px"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "71%",
    margin: "0 auto"
  },
  topInput: {
    marginTop: "25px",
    "& div": {
      height: "48px"
    },
    "& input": {
      padding: "16px 21px"
    }
  },
  selectInput: {
    marginTop: "5px",
    "& div": {
      height: "48px"
    }
  },
  textArea: {
    marginTop: "5px"
  },
  notchedOutline: {
    borderColor: "#eae9e9 !important"
  },
  sectionHeader: {
    height: "314px",
    "& img": {
      marginLeft: "10px"
    }
  },
  sectionFooter: {
    width: "71%",
    marginBottom: "110px",
    margin: "0 auto",
    height: "155px",
    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > button": {
        textTransform: "inherit",
        "& img": {
          marginLeft: "10px"
        }
      }
    },
    "& p": {
      fontSize: "20px",
      fontFamily: "Source Serif Regular"
    }
  },
  ingredientsContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  ingredientsWrapper: {
    marginTop: "-17px"
  },
  ingredientInput: {
    width: "72%",
    "& input": {
      height: "13px"
    }
  },
  weightInput: {
    width: "19%",
    "& input": {
      height: "13px"
    }
  },
  addDishContainer: {
    position: "absolute",
    width: "71%",
    bottom: "0px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& span": {
      fontFamily: "Source Serif Pro Regular"
    },
    "& button": {
      width: "960px",
      backgroundColor: "#ffb53a",
      color: "white",
      height: "64px"
    },
    "& > div": {
      width: "960px",
      boxShadow: "-1px -2px 30px 6px rgba(0,0,0,0.16)",
      "& > div": {
        width: "71%",
        height: "44px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }
  },
  addIngredientButton: {
    color: "#ffb53a",
    backgroundColor: "white",
    boxShadow: "none"
  },
  saveDishButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "10px",
    color: "white"
  }
});

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

  handleClose = () => {
    this.closeDialog();
  };

  totalWeight = () => {
    return (
      this.state.ingredients.map(ing => ing.weight).reduce((a, b) => a + b, 0) +
      " Kcl"
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          className={classes.addDishButton}
          onClick={this.openDialog}
        >
          Add a new dish
          <img src={Plus} className={classes.logo} />
        </Button>

        <Dialog
          classes={{ paper: classes.dialogPaper }}
          onClose={this.handleClose}
          maxWidth="md"
          aria-labelledby="simple-dialog-title"
          open={this.state.dialogIsOpen}
        >
          <div className={classes.formContainer}>
            <header className={classes.sectionHeader}>
              <div>
                <h2 id="simple-dialog-title">Add a new dish</h2>
                <h3>Please enter all information about your new dish</h3>
                <span>
                  Add a photo
                  <img src={Camera} />
                </span>
              </div>
            </header>
            <section>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  className={classes.topInput}
                  margin="small"
                  variant="outlined"
                  id="name"
                  label="Dish name"
                  value={this.state.dishName}
                  onChange={e => this.setState({ dishName: e.target.value })}
                  margin="normal"
                />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  className={classes.selectInput}
                  id="outlined-select-currency"
                  select
                  label="Select a dish category"
                  margin="normal"
                  variant="outlined"
                >
                  {["Type 1", "Type 2"].map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  className={classes.textArea}
                  variant="outlined"
                  label="Dish description"
                  multiline={true}
                  rows={4}
                  rowsMax={4}
                />
              </form>
            </section>
            <footer className={classes.sectionFooter}>
              <div>
                <p>Ingredients </p>
                <Button
                  color="primary"
                  onClick={this.addIngredient}
                  className={classes.addIngredientButton}
                >
                  Add a new ingredient
                  <img src={PlusYellow} />
                </Button>
              </div>

              <div className={classes.ingredientsWrapper}>
                <img src={Menu} />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  className={classes.ingredientInput}
                  value={this.state.ingredientName}
                  onChange={e =>
                    this.setState({ ingredientName: e.target.value })
                  }
                  margin="small"
                  variant="outlined"
                  id="name"
                  label="Ingredient name"
                  margin="normal"
                />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  value={this.state.ingredientWeight}
                  onChange={e =>
                    this.setState({ ingredientWeight: +e.target.value })
                  }
                  className={classes.weightInput}
                  margin="small"
                  variant="outlined"
                  id="name"
                  label="Weight (Kcl)"
                  margin="normal"
                />
              </div>

              {this.state.ingredients.length > 0 && (
                <div className={classes.addDishContainer}>
                  <div>
                    <div>
                      <span>
                        <b>{this.state.ingredients.length} ingredients</b> in
                        your dish
                      </span>
                      <span>
                        Total weight: &nbsp;
                        <b>{this.totalWeight()}</b>
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={this.saveDish}
                    variant="contained"
                    color="primary"
                  >
                    Add this dish to my menu {this.totalWeight()}
                  </Button>
                </div>
              )}
            </footer>
          </div>
        </Dialog>
      </>
    );
  }
}

export default compose(withStyles(styles))(AddDish);
