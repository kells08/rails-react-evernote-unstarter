import React, { Component } from 'react';

class UserForm extends Component {
  state = {
    name: this.props.name || '',
    username: this.props.username || '',
    password: this.props.password ||  '',
    }

    onChange = e => {
      const elementInState = e.target.name;
      const value = e.target.value;
      this.setState({ [elementInState]: value })
    }

  render() {
    const { name, username, password } = this.state;
    return (
      <div className="noteform">
        <h3>Please signup to enjoy AnyNote!</h3>
        <br/>
        <p>Name:</p> <input name="name" value={name} onChange={(e) => this.onChange(e)}/>
        <p>Username:</p> <input name="username" value={username} onChange={this.onChange}/>
        <p>Password:</p> <input name="password" value={password} onChange={this.onChange}/>
        <p>Confirm Password:</p> <input name="text" />
        <br/>
        <button className='button small' onClick={() => this.props.submitForm({...this.state})}>Sign up!</button>
        <button className='button small' onClick={this.props.createUser}>Cancel</button>
      </div>
    );
  }
}

export default UserForm;