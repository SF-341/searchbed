import React, { useState, useContext, useEffect, useReducer } from 'react'
import { firestore, storage } from '../../config'
import { Liked, DelLikeid, SetLikeid } from '../Like'


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
import clsx from 'clsx';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Collapse from '@material-ui/core/Collapse';

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
    icon: {
        color: red[500],
    },
}));
console.log("id")
const Post = ({ id }) => {

    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [username, setUsername] = useState();
    const [dateTime, setDateTime] = useState();
    const [Url, setUrl] = useState("");
    const [checkImg, setCheckImg] = useState(false);
    const [like, setLike] = useState();
    const [checkLike, setCheckLike] = useState("");


    const storageRef = storage.ref();
    const documentRef = firestore.doc("Posts/" + id);
    async function fetchdata() {
        await documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            setTitle(data.title);
            setDetails(data.details);
            setUsername(data.username);
            setDateTime(data.dateTime);
            setLike(data.like);

            if (data.imageName != null) {
                setCheckImg(true);
                var imgRef = storageRef.child('images/' + data.imageName);
                imgRef.getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                    }).catch((error) => {
                        console.log(error);
                    })
            } else {
                setCheckImg(false);
            }

        })
    }

    useEffect(() => {

        fetchdata();

    })




    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function deletePost() {
        documentRef.delete();
    }



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
            {checkImg ? <CardMedia className={classes.media} image={Url} /> : ""}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>{title}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>{details}</p>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" >
                    {checkLike ? <FavoriteIcon color="secondary" /> : <FavoriteIcon />}
                    &nbsp;&nbsp;{like}&nbsp;
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="DeleteIcon" onClick={deletePost}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="comment"
                >
                    <QuestionAnswerOutlinedIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                </CardContent>
            </Collapse>

        </Card>
    )
}

export default Post;