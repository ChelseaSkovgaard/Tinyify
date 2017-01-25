import React, { Component } from 'react';

class Folder extends Component {

  render() {
    console.log(this.props.urls);
    let urls = this.props.urls.map((url, i) => {
    return(  <li key={i} className="url-link">
        <a href={`https://${url.actualurl}`}>
        {url.shorturl}
        </a>
      </li>)
    });
        return (
      <div className="folder">
        <h4>{this.props.name} </h4>
        <ul className="url-list">
          {urls}
        </ul>
      </div>
    );
  }
}

export default Folder;
