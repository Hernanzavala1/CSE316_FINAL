import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from './components/HomeScreen';
import EditLogoScreen from './components/EditLogoScreen';
import CreateLogoScreen from './components/CreateLogoScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import userAccount from './components/userAccount';
import Login from './components/Login';
import Register from './components/Register';
const client = new ApolloClient({ uri: 'http://localhost:3003/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route  path='/homescreen' component={HomeScreen} />
        <Route path="/edit/:id/:logoId" component={EditLogoScreen} />
        <Route path="/create/:id" component={CreateLogoScreen} />
        <Route path="/user/:id" component={userAccount} />
        <Route path="/view/:id/:logoId" component={ViewLogoScreen} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();
