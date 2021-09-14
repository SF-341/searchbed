import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper, Container, Card, Box } from '@material-ui/core';

const ResetPass = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email } = e.target.elements;

        firebaseConfig.auth().sendPasswordResetEmail(email.value).then(function() {
          console.log('Password Reset Email Sent!');
          return <Redirect to="/Login" />;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode === 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
        });
     
    }


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
    return (

    <div className="container mt-5">

        <Grid container spacing={1}>

            <Grid container justifyContent="center" xs={12} md={6} spacing={0}>
                <Card elevation={3} className={classes.card}>

                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" align="center">
                    <h1 className={classes.headfront}>Reset Password</h1>
                    <Grid item >
                    <TextField type="email" label="Email address" name="email" className="form-control" required />
                    </Grid>
                    <Grid item >
                    <Button type="submit" size="medium" variant="outlined">Reset Password</Button>
                    </Grid>
                </form>
                </Card>
            </Grid>


        <Grid container justifyContent="center" xs={12} md={6} >
        <h5>asdasdasd</h5>
        </Grid>
    </Grid>



    </div>
    );
};

export default ResetPass;