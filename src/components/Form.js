import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="Form">
        <form>
          <label>
            New Folder
            <input type="text"/>
          </label>

          <button>
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
