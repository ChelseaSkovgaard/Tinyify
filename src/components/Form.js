import React, { Component } from 'react';

class Form extends Component {
  postNewURL(e){
    e.preventDefault()
    fetch(`/urls`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shortURL: "newURL",
        realURL:"www.ohyeah.com",
        folder: "Cool Links"
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
            <input type="text"/>
          </label>

          <button
          onClick={(e)=>{this.postNewURL(e)}}
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
