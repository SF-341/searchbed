import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Covidapi from './components/Covidapi'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/Auth'
import Post from './components/Post'
import CreatePost from './components/CreatePost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/covidapi" component={Covidapi} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/createpost" component={CreatePost} />

        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
