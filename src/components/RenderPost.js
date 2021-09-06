import React, { useState, useContext, useEffect } from 'react'
import firebaseConfig from "../config";
import { collection, getDocs } from "firebase/firestore";



import Post from './Post';

const RenderPost = () => {
    const Auth = firebaseConfig.auth();
    const user = Auth.currentUser;

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

        <div>
            {postList ? postList.map(key => (<Post id={key} />)) : ""}
        </div>
    )
}

export default RenderPost;