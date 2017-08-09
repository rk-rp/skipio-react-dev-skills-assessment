import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import HomePage from './components/HomePage';
import ContactListPage from './components/ContactListPage';
import ContactDetailsPage from './components/ContactDetailsPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
                <div>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/contacts" component={ContactListPage} />
                  <Route path="/contacts/:contactId" component={ContactDetailsPage} />
                </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
