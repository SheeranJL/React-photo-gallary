import React, {Component} from 'react';

class NoRoute extends Component {

  render() {
    return (
      <li className="not-found">
        <h3>The specified path you requested does not exist!</h3>
        <p>Please try entering a search term in the field above.</p>
      </li>
    )
  }
}

export default NoRoute;
