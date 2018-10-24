import React, { Component } from 'react';
import UserForm from './UserForm'

class Login extends Component {
  state = {
    clickedSignup: false
  }

  handleClick = (e) => {
    this.props.login(this.state.username, this.state.password)
  }

  handleData = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  createUser = () => {
    this.setState({
      clickedSignup: !this.state.clickedSignup
    })
  }

  saveUser = ({ name, username, password }) => {
      const token = localStorage.token
      fetch('http://localhost:3001/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify ({
        user: { 
          name,
          username,
          password
        }
      })})
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
        this.setState ({
          users: response,
          clickedSignup: false,
        })
      })
  }

  // if Edit user is added:
  // updateAllUsers = allUsers => {
  //   this.setState({
  //     currentNote: null,
  //     users: allUsers
  //   })
  // }

  render() { 
    //console.log(this.props.loggedIn) 
    //console.log(this.props)
    return (
      <div>
        {this.state.clickedSignup ? <UserForm submitForm={this.saveUser} createUser={this.createUser} /> : 
        <div className="banner">
            <h1>Welcome! </h1>
            <h4>Please login:</h4>
            <input type="text" placeholder="username" align="center" onChange={this.handleData} name="username"/>
            <input type="text" placeholder="password" onChange={this.handleData} name="password"/>
            <button type='submit' className='button small' onClick={this.handleClick}>Submit</button>
            <br/><h4 onClick={this.createUser}>No Account? <span id="signup">Signup!</span></h4>
          </div>}
        {this.props.loggedIn
        }
      </div>
    );
  } 
}

export default Login;
