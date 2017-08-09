import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Skipio Dev
            </Navbar.Brand>
        </Navbar.Header>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </Navbar>
    );
  }
}
