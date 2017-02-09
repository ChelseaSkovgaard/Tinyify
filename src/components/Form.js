import React, { Component } from 'react';

class Form extends Component {
  render() {
    let folderOptions;
    if(this.props.folders){
      folderOptions = this.props.folders.map((folder, i)=>{
          return <option key={i} value={`${folder.id}`}>{`${folder.name}`}</option>
      })
    }
    return (
      <div className="form">
        <form className="new-folder">
          <label>
            ADD NEW FOLDER
            <input type="text" ref="folderInput"/>
          </label>

          <button
          onClick={(e)=>{this.props.handleSaveFolder(e, this.refs.folderInput.value)
          this.refs.folderInput.value = ''
          }}
          >
            SAVE
          </button>
        </form>

        <form className="choose-folder">
          <label className="select-folder">
            SELECT FOLDER
            <select ref='folderOptions'>
              {folderOptions}
            </select>
          </label>
          <label className="url-input">
            URL TO SHORTEN https://
            <input type="text" ref="URL"/>
          </label>
          <button
            onClick={(e)=>{this.props.handleSaveURL(e, this.refs.folderOptions.value, this.refs.URL.value)
            this.refs.URL.value = ''
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
