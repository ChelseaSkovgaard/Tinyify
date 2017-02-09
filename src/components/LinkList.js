import React, { Component } from 'react';
import Folder from './Folder.js'

class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      sortOrder: 'desc',
      sortDate: 'desc'
    };
  }

  render() {
    let folders;
    if(this.props.folders){
      folders = this.props.folders.map((folder, i)=>{
        return <Folder key={i} sortOrder={this.state.sortOrder}
        sortDate={this.state.sortDate} folderID={folder.id} name={folder.name}/>
      })
    }
    return (
      <div className="LinkList">
        <h3> SAVED FOLDERS </h3>
        { folders }
      </div>
    );
  }
}

export default LinkList;
