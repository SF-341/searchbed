import React, { useState, useEffect } from 'react'
import firebaseConfig from "../config";

import { Container } from '@material-ui/core'


import Post from './Post';

const RenderPost = () => {

    const [postList, setPostList] = useState();

    useEffect(() => {

        let query = firebaseConfig.firestore().collection("Posts");
        query.onSnapshot(querySnapshot => {
            const List = []
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                List.push(doc.id);
            })
            setPostList(List);
        }
        );

    }, [])



    return (
        <Container>
            <div>
                {postList && postList.map(key => (<Post id={key} />))}
            </div>
        </Container>

    )
}

export default RenderPost;