import React, { Component } from 'react';

class Form extends Component {

  componentDidMount(){
    fetch(`/api/folders`)
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        this.setState({urls:res});
        console.log(res);
      });
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
          onClick={(e)=>{this.props.handleSaveFolder(e, this.refs.folderInput.value)}}
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
