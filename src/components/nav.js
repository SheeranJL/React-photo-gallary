import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component {

  handleClickButton = (e) => {
    const text = e.target.innerText;
    this.props.querySearch(text);
  }

  render() {
    return (

      <nav className="main-nav">
        <ul>
          <li onClick={this.handleClickButton}><NavLink to='/search/cats'>Cats</NavLink></li>
          <li onClick={this.handleClickButton}><NavLink to='/search/dogs'>Dogs</NavLink></li>
          <li onClick={this.handleClickButton}><NavLink to='/search/birds'>Birds</NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default NavBar
