import React, { Component } from 'react';

class LinkList extends Component {
  componentDidMount(){
    fetch(`/urls`)
      .then((res)=>{
        console.log(res);
        return res.json()
      })
      .then((res)=>{
        console.log(res);
      });
  }
  render() {
    return (
      <div className="LinkList">

      </div>
    );
  }
}

export default LinkList;
