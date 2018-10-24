import React, { Component } from 'react';

class NoteForm extends Component {
  state = {
    title: this.props.title || '',
    due_date: this.props.due_date || '',
    color: this.props.color ||  '',
    text: this.props.text ||  ''
    }

    onChange = e => {
      const elementInState = e.target.name;
      const value = e.target.value;
      this.setState({ [elementInState]: value })
    }
  
  render() {
    const { title, due_date, color, text } = this.state;
    return (
       <div className="noteform">
         <p>Note Title:</p> <input name="title" value={title} onChange={(e) => this.onChange(e)}/>
         <p>Due Date:</p> <input type="date" name="due_date" value={due_date} onChange={this.onChange}/>
         <p>Color:</p> <input name="color" value={color} onChange={this.onChange}/>
         <p>Text:</p> <textarea name="text" value={text} onChange={this.onChange}/>
         <button className='button small' onClick={() => this.props.submitForm({...this.state})}>Save</button>
       </div>
    );
  }
}

export default NoteForm;