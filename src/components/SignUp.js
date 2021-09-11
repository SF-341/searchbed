import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';


const SignUp = () => {

    const ref = firebaseConfig.firestore().collection("User");

    const addUser = () => {
        ref.add({ name, lastname, username, email, subdistrict, district, province });
    }



    const [currentUser, setCurrentUser] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");


    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        } else if (e.target.name === "username") {
            setUsername(e.target.value)
        } else if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "lastname") {
            setLastname(e.target.value)
        } else if (e.target.name === "subdistrict") {
            setSubdistrict(e.target.value)
        } else if (e.target.name === "district") {
            setDistrict(e.target.value)
        } else if (e.target.name === "province") {
            setProvince(e.target.value)
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = e.target.elements;

        if (password.value != confirmPassword.value) {
            alert("passwords are not the same");
        } else {
            try {
                firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
                setCurrentUser(true);
                addUser();

            } catch (error) {
                alert(error);
            }
        }

    }

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(7),

            },

        },
    }));

    const classes = useStyles();

    if (currentUser) {
        return <Redirect to="/dashboard" />
    }


    return (
        <>
            <div className="container mt-5">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">

                    <Grid container spacing={3}>
                        <Grid item xs><TextField type="text" label="Name" name="name" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField id="standard-basic" label="Lastname" name="lastname" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="text" label="Username" name="username" className="form-control" onChange={handleChange} required /></Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs><TextField id="standard-basic" label="Sub-District" name="subdistrict" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField id="standard-basic" label="District" name="district" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField id="standard-basic" label="Province" name="province" className="form-control" onChange={handleChange} required /></Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs><TextField type="email" label="Email address" name="email" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="password" label="Password" name="password" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="password" label="Confirm Password" name="confirmPassword" className="form-control" onChange={handleChange} required /></Grid>
                    </Grid>


                    <Button type="submit" size="large" variant="outlined">Submit</Button>
                </form>
            </div>
        </>
    )
}

export default SignUp;
