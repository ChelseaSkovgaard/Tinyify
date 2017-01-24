import React, { Component } from 'react';

class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }
  componentDidMount(){
    fetch(`/api/folders`)
      .then((res)=>{
        console.log(res);
        return res.json()
      })
      .then((res)=>{
        this.setState({urls:res});
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
