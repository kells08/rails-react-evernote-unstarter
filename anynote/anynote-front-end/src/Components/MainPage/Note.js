import React, { Component } from 'react';
class Note extends Component {
  
  render() {
    //console.log(this.props.note.id)
    const noteprops = this.props.note
    return (
      <div id="extra">
				<div className="container">
					<div className="row no-collapse-1">
            <section className="4u">
							<div className="box" style={{border:'solid'}} onClick={() => this.props.selectNote(noteprops)}>
                <h3>{noteprops.title}</h3>
                <br/>
                {/* <p>Due Date: {this.props.note.due_date} </p> */}
                <p>{noteprops.text.length <= 30 ? noteprops.text : noteprops.text.substring(0,40) + "..."}</p>
              </div>
						</section>
          </div>
        </div>
      </div>
    );  
  }
}

export default Note;


//<a href="" className="button">Read More</a> 