import React, { Component } from 'react';

class Folder extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      showUrls: false
    }
  }
  fetchUrls(){
    if(!this.state.showUrls){
      fetch(`/api/urls/${this.props.folderID}`)
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        this.setState({
          urls: res,
          showUrls: true
        }
        );
    });
  } else {
    this.setState({
      urls: [],
      showUrls: false
    })
  }
}
  render() {
    let urls;
    if(this.state.urls){
      urls = this.state.urls.map((url, i) => {
        return(
        <li key={i} className="url-link">
          <a target="_blank" href={`https://${url.actualurl}`}>
            {url.shorturl}
          </a>
        </li>)
      });
    }
      return (
      <div className="folder" onClick={()=>{this.fetchUrls()}}>
        <h4>{this.props.name} </h4>
        <ul className="url-list">
          {urls}
        </ul>
      </div>
    );
  }
}

export default Folder;
