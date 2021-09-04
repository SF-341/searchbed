import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "name"){
            setName(e.target.value)
        }else if (e.target.name === "username"){
            setUsername(e.target.value)
        }else if (e.target.name === "email"){
            setEmail(e.target.value)
        }
    }

    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = e.target.elements;
        
        if (email.value == "" || password.value == "") {
            alert("email and password is required");
        } else {
            try {

                firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
                setCurrentUser(true);

            } catch (error) {
                alert(error);
            }
        }



    }

    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    return (
        <>
            <div className="container mt-5">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" id="username" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="name" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1"onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Comfirm Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;
