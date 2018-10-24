import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div id="header" className="skel-panels-fixed">
          <div id="logo">
            <h1><a href="index.html">AnyNote </a></h1>
            <span style={{color:'#555'}}> Task Management</span>
          </div>
          
      </div>

    );
  }
}

export default Header;

//<li><a href="left-sidebar.html">Login</a></li>