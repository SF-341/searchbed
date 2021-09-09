import React, { useState} from 'react'
import { firestore, storage } from '../../config'


class PostFunction {

    constructor(props) {
        state.useState = {
            
        }
        storageRef = storage.ref();
        documentRef = firestore.doc("Posts/" + props);


    }
    

    Like(id) {
        documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            setTitle(data.title);
            setDetails(data.details);
            setUsername(data.username);
            setDateTime(data.dateTime);
        })
        documentRef.set(like)
    }

    delete(id) {
        documentRef.delete(id);
    }

    edit(id) {

    }
}