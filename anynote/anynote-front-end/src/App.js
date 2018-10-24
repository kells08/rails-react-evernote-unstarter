import React, { Component } from 'react';
import Header from './Components/Header';
import Login from './Components/Login';
import MainContainer from './Components/MainContainer';
import Footer from './Components/Footer';

import './App.css';

class App extends Component {

  state = {
    user: {
      name: "",
      username: "",
      password: ""
    },
    loggedIn: false,
    currentUser: {}
  }

   //get user info, route on backend /profile and set user
  componentDidMount() {
    //fetch user profile
    const token = localStorage.token;
    if (token) {
      fetch('http://localhost:3001/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          this.setState ({
            currentUser: data
          });
        }
      })
    }
    
    
    // //fetch notes
    // const notesUrl = 'http://localhost:3001/notes'
    // fetch(notesUrl, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }) 
    //   .then(resp => resp.json())
    //   .then(response => {
    //     this.setState ({
    //      notes: response
    //     })
    //   })
    
  }
  // if (!localStorage.token) {
  //   return null
  //   } 
  // else //if user.id == note.user_id, render notes
    

  login = (username, password) => {
    localStorage.clear()
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": {
          "username": username,
          "password": password
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.jwt) 
        { 
          localStorage.token = data.jwt;
          this.setState({
        currentUser: data.user, 
        loggedIn: true
        })
      }
      else {
        localStorage.token = "undefined"
        window.alert("Invalid credentials. Please try again!");
      }
    }
    )
  }//send user
  
  //does this need to receive username as argument?
  logout = (username) => {
    localStorage.clear()
    this.setState({
      user: {
        name: "",
        username: "",
        password: ""
      },
      loggedIn: false,
      currentUser: {}
    })
  }

  render() {
    console.log(this.state.notes)
    return (
      <div className="wrapper style1">
        <Header/>
       {localStorage.token ? null : <Login login={this.login} loggedIn={this.state.loggedIn}/>} 
        {localStorage.token ? <MainContainer currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} logout={this.logout} /> : null}
        <Footer />
      </div>
    )
  }
  
}
export default App;