import React, { Component } from 'react';

class Search extends Component {

  render() {
    return (
      <div className="search" >
        <p>Search your notes by title: </p> 
        <input type='text' placeholder='note title' onChange={e => this.props.filterTitles(e)}/> 
      </div>
    );
  }
}

export default Search;

