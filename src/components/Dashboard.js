import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'
import Covidapi from './Covidapi'

const DashBoard = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>

            <div className="container mt-5">
                <Covidapi />

                <button onClick={() => firebaseConfig.auth().signOut()} class="btn btn-danger">Sign Out</button>
            </div>
        </div>
    )
}

export default DashBoard;