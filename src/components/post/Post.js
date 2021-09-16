import React, { useState, useContext } from 'react'
import { firestore, storage } from '../../config'
import Liked from '../Like'


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



const Post = ({ id }) => {

    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [username, setUsername] = useState();
    const [dateTime, setDateTime] = useState();
    const [Url, setUrl] = useState("");
    const [checkImg, setCheckImg] = useState(false);
    const [like, setLike] = useState();
    const checkLike  = Liked(id);


    let storageRef = storage.ref();
    let documentRef = firestore.doc("Posts/" + id);
    documentRef.get().then(documentSnapshot => {
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

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function deletePost() {
        documentRef.delete();
    }

    const likePost = () => {
        
        // if (checkLike) {
        //     setCheckLike(false)
        //     documentRef.update({
        //         like: like + 1,
        //         checklike: false,
        //     });
        // }else {
        //     setCheckLike(true)
        //     documentRef.update({
        //         like: like + -1,
        //         checklike: true,
        //     })
        // }
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
            {checkImg ? <CardMedia className={classes.media} image={Url} /> : <></>}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <h1>{title}</h1>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <h5>{details}</h5>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick = {likePost}>
                    {checkLike ?  <FavoriteIcon color="secondary"/> : <FavoriteIcon />}
                    &nbsp;&nbsp;{like}&nbsp;
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="DeleteIcon" onClick = {deletePost}>
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