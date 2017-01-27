import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import _ from 'lodash';
import Form from "./Form";
import LinkList from "./LinkList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      folders: []
    };
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
      this.setState({
        folders:res
        }
      );
    });
  }
  saveNewURL(e, folderID, URL){
    e.preventDefault()
    fetch(`/api/urls`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        actualurl: URL,
        folder_id: folderID,
        clickCount: 0
      })
    })
    .then((res)=>{
      return res.json();
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img className="header-image" src="./images/rocket2.svg"/>
          <h1>JetFuel</h1>
        </header>
        <Form
          handleSaveFolder={(e, folderName)=>{this.postNewFolder(e, folderName)}}
          handleSaveURL={(e, folderID, URL)=>{this.saveNewURL(e, folderID, URL)}}
          folders={this.state.folders}
        />
        <LinkList
          folders={this.state.folders}
          urls={this.state.urls}
        />
      </div>
    );
  }
}

export default App;
