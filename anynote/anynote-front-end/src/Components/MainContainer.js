import React, { Component } from 'react';
import Search from './MainPage/Search'
import Note from './MainPage/Note'
import FullNote from './MainPage/FullNote'
import NoteForm from './MainPage/NoteForm'

class MainContainer extends Component {
  state = {
    selectedNote: null,
    clicked: false,
    clickedCreate: false,
    notes: [],
    currentNote: null,
    clickedSearch: false,
    searchTerm: " ",
    filteredNotes: [],
    show: false
  }

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      const notesUrl = 'http://localhost:3001/notes'
    fetch(notesUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
      .then(resp => resp.json())
      .then(response => {
        this.setState ({
         notes: response
        })
      })
    } 
  }

  //if clicked and selectedNote is empty, render blank form
  createNote = () => {
    this.setState({
      clickedCreate: !this.state.clickedCreate
    })
  }

  saveNewNote = ({ title, due_date, color, text }) => {
      const token = localStorage.token
      fetch('http://localhost:3001/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify ({
        note: { 
          title,
          due_date, // same as due_date: due_date
          color,
          text 
        }
      })})
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
        this.setState ({
          notes: response,
          clickedCreate: false,
          selectedNote: null
        })
      })
  }

  updateAllNotes = allNotes => {
    this.setState({
      currentNote: null,
      selectedNote: null,
      notes: allNotes
    })
  }

  selectNote = (note) => {
    console.log(note)
    this.setState({selectedNote: note, clicked:!this.state.clicked})
    
  } //setting state of this.props.note.id

  searchNotes = () => {
    this.setState({clickedSearch: !this.state.clickedSearch})
  }

  handleLogout = (e) => {
    this.props.logout(this.state.username)
  }

  //-----------Search------------
  filterTitles = (e) => {
    this.setState({searchTerm:e.target.value}, () =>  
    this.filteredTitles(this.state.searchTerm)
    )
  }

  filteredTitles = (searchTerm) => {
    const allTitles = this.state.notes
    const searchTermLower = searchTerm.toLowerCase()
    //console.log(allTitles)
    const filteredNotes = allTitles.filter( note => {
      return note.title.toLowerCase().includes(searchTermLower)
    })
    console.log(filteredNotes)
    // return filteredNotes
    if (filteredNotes) {
      this.setState({
        filteredNotes: filteredNotes,
        show: true
     })
    }
    else {
      this.setState({
        show: false
      })
    }
  }
  //---------end Search----------

  render(){
    console.log(this.state.notes)
    return (
      <div>
        <div>
          <nav id="nav">
            <div className="banner">
              <h2>Hey {this.props.currentUser.name}!</h2>
            </div>
            <button className='button small' onClick={this.createNote} >Create a new note</button>
            <button className='button small' onClick={this.searchNotes} >Search your notes</button> 
            <button className='button small' onClick={this.handleLogout} >Logout</button>           
          </nav>
          <br/>
        </div>
         
          <div >
          {this.state.clickedSearch ? <Search notes={this.state.notes} filterTitles={this.filterTitles} /> : null }
          {this.state.clickedCreate ? <NoteForm submitForm={this.saveNewNote} /> : null}
          { this.state.show && (this.state.clicked === false)
            ? this.state.filteredNotes.map(note => (
              <div className="" >
                <Note note={note} key={note.id} selectNote={this.selectNote}/>
              </div> 
            ))
            :this.state.notes.map(note => (
              <div className="" >
                <Note note={note} key={note.id} selectNote={this.selectNote}/>
              </div> 
            )) 
          }
          {this.state.clicked ? <FullNote {...this.state.selectedNote} updateAllNotes={this.updateAllNotes} selectedNote={this.selectNote} /> : null }

          
        </div>
        <br/>
        <br/>
      </div>
    ) 
  }
  
}

export default MainContainer;



// GET note -- duplicate of GET notes on App page?
  // fetch('http://localhost:3001/notes', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Authorization: 'Bearer ' + localStorage.token
  //   }})
  //   .then(resp => resp.json())
  //   .then(console.log)

  // //GET Notes/:id
  // getNotes = () => {
  // const notesUrl = 'http://localhost:3001/notes'
  // fetch(notesUrl)
  //   .then(resp => resp.json())
  //   .then(notes:notes)
  // }