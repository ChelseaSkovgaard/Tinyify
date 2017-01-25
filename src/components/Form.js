import React, { Component } from 'react';

class Form extends Component {

  componentDidMount(){
  }
  render() {
    let folderOptions;
    if(this.props.folders){

      let folderKeysArray = Object.keys(this.props.folders)

      folderOptions = folderKeysArray.map((folderKey, i)=>{
          return <option key={i} value={`${folderKey}`}>{`${this.props.folders[folderKey]}`}</option>
      })
    }
    return (
      <div className="Form">
        <form className="new-folder">
          <label>
            ADD NEW FOLDER
            <input type="text" ref="folderInput"/>
          </label>

          <button
          onClick={(e)=>{this.props.handleSaveFolder(e, this.refs.folderInput.value)}}
          >
            SAVE
          </button>
        </form>
        <form className="choose-folder">
          <label>
            SELECT FOLDER
            <select ref='folderOptions'>
              {folderOptions}
            </select>
          </label>
          <label>
            URL
            <input type="text" ref="URL"/>
          </label>
          <button
            onClick={(e)=>{this.props.handleSaveURL(e, this.refs.folderOptions.value, this.refs.URL.value)}}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
