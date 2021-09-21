import React, { useContext } from "react";
import { Redirect,Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import GetUser from './GetUserprofile'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Card } from '@material-ui/core';

const LogIn = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
      
    } catch (error) {
      alert(error.message);
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {

        margin: theme.spacing(7),
        width: 300,

      }

    },

    card: {
      minWidth: 400,
      background: '#F9F9F9',
    },
    headfront: {
      color: "#515151",
    }
  }));

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (

    <div className="container mt-5">

      <Grid container spacing={1}>

        <Grid container justifyContent="center" xs={12} md={6} spacing={0}>
          <Card elevation={3} className={classes.card}>

            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" align="center">
              <h1 className={classes.headfront}>Log In</h1>
              <Grid item >
                <TextField type="email" label="Email address" name="email" className="form-control" required />
              </Grid>
              <Grid item >
                <TextField type="password" label="Password" name="password" className="form-control" required />
              </Grid>
              <Grid item >
                <Button type="submit" size="large" variant="outlined">Submit</Button>
              </Grid>
              <Grid item>
              <p className="forgot-password text-right"><Link to={'/ResetPass'}>Forgot password?</Link></p>
              </Grid>
            </form>
          </Card>
        </Grid>


        <Grid container justifyContent="center" xs={12} md={6} >
          <h5></h5>
        </Grid>
      </Grid>



    </div>

  );
};

export default LogIn;
