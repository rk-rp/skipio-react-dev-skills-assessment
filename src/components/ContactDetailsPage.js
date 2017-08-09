import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert,
} from 'react-bootstrap';
import * as contactService from '../services/contactService';
import * as messageService from '../services/messageService';

export default class ContactDetailsPage extends React.Component {
  possibleStates = {
    loading: 'loading',
    loadError: 'loadError',
    display: 'display',
  };
  smsMaxLength = 160;

  constructor(props) {
    super(props);

    this.state = {
      state: this.possibleStates.loading,
      loadError: null,
      contact: null,
      sms: '',
      smsError: null,
    };
  }

  async componentDidMount() {
    this.setState({
      state: this.possibleStates.loading,
    });

    try {
      const response = await contactService.getContact(this.props.match.params.contactId);
      this.setState({
        state: this.possibleStates.display,
        contact: response.data,
      });
    } catch (ex) {
      this.setState({
        state: this.possibleStates.loadError,
        loadError: 'There was an error loading the contact. Reload the page to try again.',
      });
    }
  }

  handleSmsChange(e) {
    this.setState({
      sms: e.target.value,
    });
  }

  async handleSendSms() {
    try {
      await messageService.sendSms(this.state.contact.id, this.state.sms);
      this.setState({
        sms: '',
        smsError: null,
      });
    } catch (ex) {
      this.setState({
        smsError: 'There was a problem sending the sms.',
      });
    }
  }


  renderContent() {
    switch (this.state.state) {
      case this.possibleStates.loading:
        return (
          <div>Loading...</div>
        );
      case this.possibleStates.loadError:
        return (
          <div>{this.state.loadError}</div>
        );
      case this.possibleStates.display: {
        const contact = this.state.contact;
        return (
          <div>
            <div>{contact.full_name}</div>
            <div>{contact.phone_mobile}</div>
            <div>{contact.email}</div>
            <br />
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <ControlLabel
                    className="pull-left"
                  >
                    SMS
                  </ControlLabel>
                  <span
                    className="pull-right"
                  >
                    {this.smsMaxLength - this.state.sms.length} chars remaining
                  </span>
                  <FormControl
                    componentClass="textarea"
                    maxLength={this.smsMaxLength}
                    value={this.state.sms}
                    onChange={this.handleSmsChange.bind(this)}
                  />
                </FormGroup>
                {this.state.smsError ? 
                  <Alert bsStyle="danger">
                    {this.state.smsError}
                  </Alert>
                  : null
                }
                <FormGroup>
                  <Button
                    bsStyle="success"
                    className="pull-right"
                    onClick={this.handleSendSms.bind(this)}
                  >
                    Send SMS
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        );
      }
      default:
        throw new Error(`Unrecognized state ${this.state.state}. See this.possibleStates for allowed state.`);
    }
  }

  render() {
    return (
      <div>
        <h2>
          Contact Details
        </h2>
        {this.renderContent()}
      </div>
    )
  }
}
