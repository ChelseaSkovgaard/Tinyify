import React, { Component } from 'react';
import Folder from './Folder.js'

class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      sortOrder: 'desc'
    }
  }
  componentDidMount(){

  }
  toggleSortOrder(){
    if(this.state.sortOrder === 'asc'){
      this.setState({
        sortOrder: 'desc'
      })
    } else {
      this.setState({
        sortOrder: 'asc'
      })
    }
  }
  render() {
    let folders;
    if(this.props.folders){
      folders = this.props.folders.map((folder, i)=>{
        return <Folder key={i} sortOrder={this.state.sortOrder} folderID={folder.id} name={folder.name}/>
      })
    }
    return (
      <div className="LinkList">

        <button onClick={()=>{this.toggleSortOrder()}}>Sort</button>

        <h3> SAVED LINKS </h3>
        {folders}
      </div>
    );
  }
}
export default LinkList;
