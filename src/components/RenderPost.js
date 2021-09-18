import React, { useState, useEffect } from 'react'
import firebaseConfig from "../config";

import { Container } from '@material-ui/core'


import Post from './post/Post';

const RenderPost = () => {
    const [postList, setPostList] = useState();

    async function fecthPost() {
        const res = await firebaseConfig.firestore().collection("Posts").orderBy("dateTime", "desc");
        await res.onSnapshot(querySnapshot => {
            const List = [];
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(function (doc, index) {
                List.push({
                    key: index,
                    id: doc.id,
                });
            });
            setPostList(List);
        }
        );
    }

    useEffect(() => {
        fecthPost();
    }, [])

    return (
        <Container>
            <div>
                {postList && postList.map((data) => (<Post key={data.key} id={data.id} />))}
            </div>
        </Container>

    )
}

export default RenderPost;