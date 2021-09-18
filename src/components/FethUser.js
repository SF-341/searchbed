import { useReducer, useEffect } from 'react'
import firebaseConfig, { firestore } from '../config'

const initialState = {
    loading: false,
    data: null,
}

function apiUser(state, action) {
    switch (action.type) {
        case "DATA_FETCH_START":
            return { ...state, loading: false };
        case "DATA_FETCH_SUCCESS":
            return { ...state, loading: true, data: action.payload };
        default:
            return state;
    }
}

export default function FethUser() {
    const [data, dispatch] = useReducer(apiUser, initialState);

    const Auth = firebaseConfig.auth();
    const user = Auth.currentUser;
    const email = user.email;
    const refUser = firestore.collection("User");

    useEffect(() => {
        dispatch({ type: "DATA_FETCH_START" });

        refUser.onSnapshot(querySnapshot => {
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                if (doc.data().email === email) {
                    dispatch({ type: "DATA_FETCH_SUCCESS", payload: doc.data() });
                }
            });
        })

    }, [])

    return data;
}
