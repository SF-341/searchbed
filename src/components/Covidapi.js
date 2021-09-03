import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

import { makeStyles, withStyle } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';




const Covidapi = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((response) => response.json())
      .then(result => {
        setItems(result[0]);
      })
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


  //const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //     return <Redirect to="/login" />;
  // }

  const classes = useStyles();

  return (
    <div>
      <div container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit">
              New case
            </Typography>
              <Typography variant="h6" color="inherit">
                {items.new_case}
              </Typography>
              <Typography variant="h8" color="inherit">
                Total case
              </Typography>
              <Typography variant="h6" color="inherit">
              {items.total_case}
              </Typography></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit">
              New case excludeabroad
            </Typography>
            <Typography variant="h6" color="inherit">
                {items.new_case_excludeabroad}
              </Typography>
              <Typography variant="h8" color="inherit">
              Total case excludeabroad
              </Typography>
              <Typography variant="h6" color="inherit">
                {items.total_case_excludeabroad}
              </Typography></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit">
              New death
            </Typography>
            <Typography variant="h6" color="inherit">
                {items.new_death}
              </Typography>
              <Typography variant="h8" color="inherit">
              Total death
              </Typography>
              <Typography variant="h6" color="inherit">
                {items.total_case}
              </Typography></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit">
              New recovered
              </Typography>
              <Typography variant="h6" color="inherit">
                {items.new_recovered}
              </Typography>
              <Typography variant="h8" color="inherit">
              Total recovered
              </Typography>
              <Typography variant="h6" color="inherit">
                {items.total_recovered}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};


export default Covidapi;
