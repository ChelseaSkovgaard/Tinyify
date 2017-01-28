import React, { Component } from 'react';
import _ from "lodash";
import moment from "moment";

class Folder extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      showUrls: false,
      sortOrder: "desc",
      sortDate: "desc"
    };
  }
  fetchUrls(){
    if(!this.state.showUrls){
      fetch(`/api/urls/${this.props.folderID}`)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        this.setState({
          urls: res,
          showUrls: true
      });
    });
  } else {
    this.setState({
      urls: [],
      showUrls: false
    });
  }
}
  redirectToUrl(shorturl){
    fetch(`/a/${shorturl}`).then((res)=>{
    }).catch((error)=>{})
  }

  toggleSortOrder(){
    if(this.state.sortOrder === 'asc'){
      this.setState({
        sortOrder: 'desc'
      });
    } else {
      this.setState({
        sortOrder: 'asc'
      });
    }
    let urls = this.state.urls
    let popularityurls = _.orderBy(urls, "clickCount", [this.state.sortOrder]);
    this.setState({urls: popularityurls});
  }

  toggleSortDate(){
    if(this.state.sortDate === 'asc'){
      this.setState({
        sortDate: 'desc'
      });
    } else {
      this.setState({
        sortDate: 'asc'
      });
    }
    let urls = this.state.urls
    let dateurls = _.orderBy(urls, "created_at", [this.state.sortDate]);
    this.setState({urls: dateurls});
  }

  render() {
    let urls;
    if(this.state.urls){
      urls = this.state.urls;
      urls = urls.map((url, i) => {
        return(
        <li key={i} className="url-link">
          <a target="_blank" href={`${url.actualurl}`} onClick={()=>{this.redirectToUrl(url.shorturl)}}>
            {url.shorturl}
          </a>
          <p>Date Added: {moment(url.created_at).format('MM/DD/YYYY')}</p>
          <p>Popularity: {url.clickCount} </p>
        </li>)
      });
    }
      return (
      <div className="folder" >
        <h4 onClick={()=>{this.fetchUrls()}}>{this.props.name} </h4>
        <button className="sort-btn" onClick={()=>{this.toggleSortOrder()}}>
          Sort By Popularity
        </button>
        <button className="sort-btn" onClick={()=>{this.toggleSortDate()}}>
          Sort By Date
        </button>
        <ul className="url-list">
          {urls}
        </ul>
      </div>
    );
  }
}

export default Folder;
