import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Form from "./Form";
import LinkList from "./LinkList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      folders: {

      },
      selectedFolder: ''
    }
  }
  componentDidMount(){
    fetch(`/api/folders`)
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        this.setState({
          folders:res
          }
        );
        console.log(res);
      });
  }
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
  saveNewURL(e, folderName, URLTitle){
    e.preventDefault()
    console.log(folderName, URLTitle);
  }
  render() {
    return (
      <div className="App">
        <h1> JetFuel</h1>
        <Form
          handleSaveFolder={(e, folderName)=>{this.postNewFolder(e, folderName)}}
          handleSaveURL={(e, folderName, URLTitle)=>{this.saveNewURL(e, folderName, URLTitle)}}
          folders={this.state.folders}
        />
        <LinkList />
      </div>
    );
  }
}

export default App;
