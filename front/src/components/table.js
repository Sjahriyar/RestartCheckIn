import React from 'react'
import Row from './row'

class Table extends React.Component {

  render(){

    const mapIt = this.props.passRow
    console.log(mapIt);

    return (
      <table className="bordered-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Check in Time</th>
          <th>Photo</th>
        </tr>
      </thead>

      </table>

    )
  }
}
export default Table
