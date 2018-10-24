import React, { Component } from 'react';
import NoteForm from './NoteForm'

class FullNote extends Component {
  // constructor(props) {
  //   super(props)
    state = {
        title: this.props.title || '',
        due_date: this.props.due_date || '',
        color: this.props.color || '',
        text: this.props.text || '',
        id: this.props.id || '',
        mode: 'view'
    };  

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSave = this.handleSave.bind(this);
  //   this.handleEdit = this.handleEdit.bind(this);
  // }
  
  // handleChange = (e) => {
  //   this.setState({inputTexts: {...this.state.inputTexts, [e.target.name]: e.target.value }});
  // }

  // handleSave = () => {
  //   this.setState({noteInputs: this.state.inputTexts, mode:'view'})
  // }
  saveEdit= ({ title, due_date, color, text }) => {
    const token = localStorage.token
    fetch(`http://localhost:3001/notes/${this.state.id}`, {
    method: 'PATCH',
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
      this.setState ({  // after setting state in this component back to view mode send response back to callback to mainContainer
        mode: 'view',
        title: '',
        due_date: '',
        color: '',
        text: '',
        id: '',
      }, () => {
        this.props.updateAllNotes(response);
      })
    })
}

  handleEdit = () => {
    this.setState({
      mode:'edit',
    showingForm: true
    })
  }

  // renderInputFields() {
  //   console.log(this.props)
  //   if(this.state.mode === 'view') {
  //     return <div></div>
  //   } else {
  //     return (
  //       <NoteForm />
  //     )
  //   }
  // } 

  handleDelete= () => {
    const token = localStorage.token
    fetch(`http://localhost:3001/notes/${this.state.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then(resp => resp.json())
    .then(response => {
      this.setState ({  // after setting state in this component back to view mode send response back to callback to mainContainer
        mode: 'view',
      }, () => {
        this.props.updateAllNotes(response);
      })
    })
  }

  renderEditButton = () => {
    if (this.state.mode === 'view') {
      return (
        <div>
          <button class='button small' onClick={this.handleEdit}>
            Edit
          </button>
          <br/>
        </div>
      );
    } else {
      return (
        <div>
          <button class='button small' onClick={this.handleDelete}>
            Delete
          </button>
          <br/>
        </div>
      );
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="banner" >
        <h2>{this.state.title ? this.state.title : 'None selected'}</h2>
        <p>{this.state.text ? this.state.text : 'None selected'}</p>
        {/* {this.renderInputFields()} */}
        {this.renderEditButton()}
        <button class='button small' onClick={this.props.selectedNote}>Cancel</button>
        {this.state.mode === 'edit' ? <NoteForm {...this.state} submitForm={this.saveEdit}/> : null}
      </div>
    );
  } 
}

export default FullNote;

