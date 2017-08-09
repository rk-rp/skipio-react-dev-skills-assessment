import * as api from './api';
import axios from 'axios';

export async function getOwnContacts() {
  const response = await axios.get(api.url('contacts'), api.params());
  return response.data;
}

export async function getContact(contactId) {
  const response = await axios.get(api.url(`contacts/${contactId}`), api.params());
  return response.data;
}
