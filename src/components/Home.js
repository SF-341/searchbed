import React, { useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import CreatePost from './post/CreatePost'
import RenderPost from './RenderPost'

const Home = () => {
    const { currentUser } = useContext(AuthContext);


    return (
        <>
            <div className="container mt-4">
                <CreatePost />
                {!currentUser ? <Redirect to="/login" /> : <> <RenderPost /> </>}
            </div>
        </>
    )
}

export default Home;