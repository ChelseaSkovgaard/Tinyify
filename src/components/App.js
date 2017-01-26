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
      folders: {

      },
      urls: []
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
      });
      fetch(`/api/urls`)
        .then((res)=>{
          return res.json()
        })
        .then((res)=>{
          this.setState({
            urls: _.map(res, (item)=>{
              return item
            })
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

    })
  }
  saveNewURL(e, folderID, URL){
    e.preventDefault()
    fetch(`/api/folders/${folderID}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        actualurl: URL
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      console.log(res);
    });
  }
  incrementURLClicks(e, urlID){
    e.preventDefault();
    fetch(`/api/urls/${urlID}`, {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      return res.json()
    })
    .then((res) => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className="App">
        <header>
        <img className="header-image" src="./images/rocket2.svg"/>
        <h1> JetFuel</h1>
        </header>
        <Form
          handleSaveFolder={(e, folderName)=>{this.postNewFolder(e, folderName)}}
          handleSaveURL={(e, folderID, URL)=>{this.saveNewURL(e, folderID, URL)}}
          folders={this.state.folders}
        />
        <LinkList
          folders={this.state.folders}
          urls={this.state.urls}
          handleIncrementClicks={(e, urlID) => {this.incrementURLClicks(e, urlID)}}
        />
      </div>
    );
  }
}

export default App;
