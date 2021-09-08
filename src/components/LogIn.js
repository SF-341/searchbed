import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Card } from '@material-ui/core';

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;


    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(7),
        width: 300,

      },
      card: {
        Width: 300,
        
      }

    },
  }));

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="container mt-5">

        <Grid container spacing={3}>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">


            <Grid container direction="row" justifyContent="center" xs spacing={3}>
            
              <h1>Log In</h1>
              <Grid item >
                <TextField type="email" label="Email address" name="email" className="form-control" required />
              </Grid>
              <Grid item >
                <TextField type="password" label="Password" name="password" className="form-control" required />
              </Grid>
              <Grid item >
                <Button type="submit" size="large" variant="outlined">Submit</Button>
              </Grid>
            </Grid>
          </form>
          <Grid item xs>
            asdasdasd
          </Grid>
        </Grid>



      </div>
    </>
  );
};

export default LogIn;
