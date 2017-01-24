import React, { Component } from 'react';

class Form extends Component {
  postNewFolder(e, folderName){
    e.preventDefault()
    fetch(`/api/folders`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        folderName
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      console.log(res);
    })
  }
  render() {
    return (
      <div className="Form">
        <form>
          <label>
            New Folder
            <input type="text" ref="folderInput"/>
          </label>

          <button
          onClick={(e)=>{this.postNewFolder(e, this.refs.folderInput.value)}}
          >
            Save New Folder
          </button>
        </form>
        <form>
          <label>
            Choose Folder
            <select>
              <option value="option1"> Option1 </option>
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
