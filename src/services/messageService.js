import * as api from './api';
import axios from 'axios';

export async function sendSms(contactId, body) {
  const data = {
    recipients: [ `contact-${contactId}` ],
    message: { body },
  };

  return await axios.post(api.url('messages'), data, api.params());
}
