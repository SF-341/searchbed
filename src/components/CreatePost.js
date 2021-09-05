import React, { useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'


const CreatePost = () => {

    const ref = firebaseConfig.firestore().collection("Posts");

    
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");


    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else if (e.target.name === "details") {
            setDetails(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPost();
    }

    const addPost = () => {
        ref.add({ title, details });

    }

    const useStyles = makeStyles({
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        }
    });

    const classes = useStyles();

    return (
        <Container>
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create a New Post
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    name="title"
                    className={classes.field}
                    label="Post Title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                />
                
                <TextField
                    onChange={handleChange}
                    name="details"
                    className={classes.field}
                    label="Details"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                />

                <Button              
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                >
                    submit
                </Button>
            </form>
        </Container>
    )
}

export default CreatePost;





















