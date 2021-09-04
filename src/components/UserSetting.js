import React, { useState, useEffect, Fragment } from 'react'
import firebase from "../config";
import { v4 as uuidv4 } from 'uuid';

const UserSetting =() => {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(false);



  const ref = firebase.firestore().collection("User");


  function getUser() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUser(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getUser();
  }, []);


  function addUser(newUser) {
    ref
      .doc(newUser.id)
      .set(newUser)
      .then(console.log(newUser))
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteUser(user) {
    ref
      .doc(User.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <div>
        <h1>User</h1>

        {User.map((User) => (
          <div key={User.id}>
            <h2>{User.name}</h2>
            <p>{User.username}</p>
            <p>{User.email}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );

}

export default UserSetting;
