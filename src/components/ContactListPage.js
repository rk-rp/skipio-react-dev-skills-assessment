import React from 'react';
import {
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as contactService from '../services/contactService';

export default class ContactListPage extends React.Component {
  possibleStates = {
    loading: 'loading',
    error: 'error',
    display: 'display',
  };

  constructor(props) {
    super(props);

    this.state = {
      state: this.possibleStates.loading,
      error: null,
      contactList: null,
    };
  }

  async componentDidMount() {
    this.setState({
      state: this.possibleStates.loading,
    });

    try {
      const response = await contactService.getOwnContacts();
      this.setState({
        state: this.possibleStates.display,
        contactList: response.data,
      });
    } catch (ex) {
      this.setState({
        state: this.possibleStates.error,
        error: 'There was an error loading the contacts. Reload the page to try again.',
      });
    }
  }

  renderContent() {
    switch (this.state.state) {
      case this.possibleStates.loading:
        return (
          <div>Loading...</div>
        );
      case this.possibleStates.error:
        return (
          <div>{this.state.error}</div>
        );
      case this.possibleStates.display:
        return (
          <div>
            <p>
              Click on a contact to be able to send an SMS.
            </p>
            <ListGroup>
              {this.state.contactList.map(x => {
                return (
                  <Link
                    key={x.id}
                    to={`/contacts/${x.id}`}
                    className="list-group-item"
                  >
                    <h3>{x.full_name}</h3>
                    <div>{x.phone_mobile}</div>
                    <div>{x.email}</div>
                  </Link>
                );
              })}
            </ListGroup>
          </div>
        );
      default:
        throw new Error(`Unrecognized state ${this.state.state}. See this.possibleStates for allowed state.`);
    }
  }

  render() {
    return (
      <div>
        <h2>
          Contacts
        </h2>
        {this.renderContent()}
      </div>
    );
  }
}
