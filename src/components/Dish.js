import React from "react";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

import DishImg from "assets/Dish.png";

const useStyles = makeStyles(theme => ({
  card: {
    width: "305px",
    height: "426px",
    position: "relative",
    boxShadow: "-1px -2px 30px 6px rgba(0,0,0,0.16);",
    borderRadius: "12px",
    "&:nth-child(2n)": {
      margin: "auto"
    }
  },
  media: {
    height: "100%"
  },
  patchAbove: {
    width: "100%",
    height: "80px",
    backgroundColor: "white",
    position: "absolute",
    top: "215px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function Dish(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={DishImg}
        title="Paella dish"
      />
      <div className={classes.patchAbove}>
        <p>{props.dishName}</p>
      </div>
    </Card>
  );
}
