import React, { Component } from 'react';
import axios from 'axios'
import Table from './table'
import Row from './row'
import '../bootcamp.css';
import '../style.css';

class CurrentTime extends Component {
constructor(){
  super()
  this.state = {
    backend: {
      node: ''
    }
}
    axios.get('http://localhost:4500/checkIn', {})
    .then(function(response) {

      this.setState({
          backend: response.data
      });
    } //then
  ).catch(function (error) {
    console.log(error);
  });

}

  render() {


    return (
      <div className="container">
      <div>
        <h1>Live Check in</h1>

        <hr />
        <Table passRow={this.state.backend}/>
        <hr />
        <Row />
      </div>
      </div>
    );
  }
}

export default CurrentTime;
