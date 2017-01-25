import React, { Component } from 'react';
import Folder from './Folder.js'

class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }
  componentDidMount(){

  }
  render() {

    let folders;
    if(this.props.folders){
      let foldersArray = Object.keys(this.props.folders)
      folders = foldersArray.map((folderKey, i)=>{
        let filteredURLs = this.props.urls.filter((url)=>{
          return url.folderid === folderKey
        })
        return <Folder key={i} urls={filteredURLs} name={this.props.folders[folderKey]}/>
      })
    }
    return (
      <div className="LinkList">
        <h3> SAVED LINKS </h3>
        {folders}
      </div>
    );
  }
}
export default LinkList;
