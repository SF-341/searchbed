import React, { useState, useContext } from 'react'
import firebaseConfig, { firestore, storage } from '../config'
import GetUser from './GetUserprofile'



const userRef = firestore.doc("User/ZRhCNpZOCbfmPuwc4dKa");


const Liked = (postId) => {
    let temp = [];
    let [check, setCheck] = useState();
    userRef.get().then(userSnapshot => {
        let data = userSnapshot.data();
        let data1 = data.likepost;
        data1.forEach(key => {
            temp.push(key);
        })

        if (temp.includes(postId)) {
            setCheck(true);
        } else {
            setCheck(false)
        }

    })

    return check;

}

export default Liked;