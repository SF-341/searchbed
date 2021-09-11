import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';

import firebaseConfig, { storage, firestore } from '../config'
import GetUser from './GetUserprofile'
import { AuthContext } from './Auth'

const Profile = () => {

  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(GetUser.ListUser);
  const [firstName, setFirstName] = useState(userInfo.name);
  const [lastName, setLastName] = useState(userInfo.lastname);
  const [userName, setUserName] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [subDistrict, setSubDistrict] = useState(userInfo.subdistrict);
  const [district, setDistrict] = useState(userInfo.district);
  const [province, setProvince] = useState(userInfo.province);
  const [submit, setSubmit] = useState(true);
  const [text, setText] = useState(true);


  useEffect(() => {
    if (localStorage.getItem('firstName') === null) {
      window.onbeforeunload = function () {
        localStorage.setItem('firstName', userInfo.name);
    localStorage.setItem('lastName', userInfo.lastname);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('subDistrict', subDistrict);
    localStorage.setItem('district', district);
    localStorage.setItem('province', province);
      };
    }


  }, [])

  const whenReload = () => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('userName', userInfo.username);
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('subDistrict', userInfo.subdistrict);
    localStorage.setItem('district', userInfo.district);
    localStorage.setItem('province', userInfo.province);
  }

  const handleChange = (e) => {
    if (e.target.name === "firstname") {
      setFirstName(e.target.value)
    } else if (e.target.name === "username") {
      setUserName(e.target.value)
    } else if (e.target.name === "lastname") {
      setLastName(e.target.value)
    } else if (e.target.name === "subdistrict") {
      setSubDistrict(e.target.value)
    } else if (e.target.name === "district") {
      setDistrict(e.target.value)
    } else if (e.target.name === "province") {
      setProvince(e.target.value)
    }
  }

  const edit = () => {
    setSubmit(false);
    setText(false);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    const ref = firestore.doc("User/" + GetUser.id);
    try {
      ref.update({
        name: firstName,
        lastname: lastName,
        username: userName,
        subdistrict: subDistrict,
        district: district,
        province: province,
      }).then(function () {
        whenReload();
        setSubmit(true);
        setText(true);
      });
    } catch (error) {
      alert(error);
    }



  }

  if (email === undefined) {
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setUserName(localStorage.getItem('userName'));
    setEmail(localStorage.getItem('email'));
    setSubDistrict(localStorage.getItem('subDistrict'));
    setDistrict(localStorage.getItem('district'));
    setProvince(localStorage.getItem('province'))
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (

    <div className="container mt-5">
      {!currentUser ? <Redirect to="/" /> : <></>}
      <h1>Profile</h1>
      <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={5}>
          <Grid item xs={8}><TextField id="standard-basic" label="Name" name="firstname" className="form-control" disabled={text} defaultValue={firstName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="Lastname" name="lastname" className="form-control" disabled={text} defaultValue={lastName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="Username" name="username" className="form-control" disabled={text} defaultValue={userName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="Email" name="email" className="form-control" disabled defaultValue={email} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="Sub-district" name="subdistrict" className="form-control" disabled={text} defaultValue={subDistrict} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="District" name="district" className="form-control" disabled={text} defaultValue={district} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField id="standard-basic" label="Province" name="province" className="form-control" disabled={text} defaultValue={province} onChange={handleChange} /></Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item ><Button size="large" variant="outlined" onClick={edit}>Edit</Button></Grid>
          <Grid item ><Button type="submit" size="large" variant="outlined" disabled={submit}>Submit</Button></Grid>
        </Grid>

      </form>
    </div>
  );


}

export default Profile;
