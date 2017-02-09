import React, { Component } from 'react';
import _ from 'lodash';
import Form from "./Form";
import LinkList from "./LinkList";
import postNewFolder from '../posting-functions/postFolder';
import saveNewURL from '../posting-functions/postUrl';

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

  setFolderState(res) {
    this.setState({
      folders:res
    });
  }

  render() {
    return (
      <div className="App">
        <header>

          <h1><img className="header-image" src="./images/mouse.svg"/>Tinify</h1>
          <p className="header-tagline">
            A URL shortener that creates tiny links that can be saved
            and shared
          </p>
        </header>

        <Form
          handleSaveFolder={(e, folderName, res) => {postNewFolder(e, folderName, this.setFolderState(res))}}
          handleSaveURL={(e, folderID, URL) => {saveNewURL(e, folderID, URL)}}
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
