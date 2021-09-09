import React, { useState, useContext } from 'react'
import { firestore, storage } from '../../config'
import { AuthContext } from '../Auth'
import { Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';



const Post = ({ id }) => {
    
    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [username, setUsername] = useState();
    const [dateTime, setDateTime] = useState();
    const [Url, setUrl] = useState("");

    let storageRef = storage.ref();
    let documentRef = firestore.doc("Posts/" + id);
    documentRef.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        setTitle(data.title);
        setDetails(data.details);
        setUsername(data.username);
        setDateTime(data.dateTime);

        var imgRef = storageRef.child('images/' + data.imageName);
        imgRef.getDownloadURL()
            .then((url) => {
                setUrl(url);
            }).catch((error) => {
                console.log(error);
            })
    })

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 700,
        },
        media: {
            hight: 0,
            paddingTop: '56.25%'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));


    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <h1>U</h1>
                    </Avatar>
                }
                title={username}
                subheader={dateTime}
            />
            <CardMedia
                className={classes.media}
                
                image={Url}

            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <h1>{title}</h1>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <h5>{details}</h5>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="DeleteIcon">
                    <DeleteIcon fontSize="large" />
                </IconButton>

            </CardActions>

        </Card>
    )
}

export default Post;