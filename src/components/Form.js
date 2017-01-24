import React, { Component } from 'react';

class Form extends Component {

  componentDidMount(){
  }
  render() {
    let folderOptions;
    if(this.props.folders){

      let folderKeysArray = Object.keys(this.props.folders)

      console.log(folderKeysArray);
      folderOptions = folderKeysArray.map((folderKey, i)=>{
          return <option key={i} value={`${folderKey}`}>{`${this.props.folders[folderKey]}`}</option>
      })
    }
    return (
      <div className="Form">
        <form>
          <label>
            New Folder
            <input type="text" ref="folderInput"/>
          </label>

          <button
          onClick={(e)=>{this.props.handleSaveFolder(e, this.refs.folderInput.value)}}
          >
            Save New Folder
          </button>
        </form>
        <form>
          <label>
            Choose Folder
            <select>
              {folderOptions}
            </select>
          </label>
          <label>
            URL
            <input type="text"/>
          </label>
          <button>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
