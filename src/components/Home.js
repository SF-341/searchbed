import React, { useContext } from 'react'
import { Link , Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="container mt-5">
                <h1>Home</h1>
                {!currentUser ?  <Redirect to = "/login"/> : <></>}
            </div>
        </>
    )
}

export default Home;