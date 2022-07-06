import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Spotify from './pages/Spotify';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
import SearchTracks from './components/SearchTracks';


import { setContext } from '@apollo/client/link/context'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider
      client={client}
    >
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Spotify} />
            <Route exact path='/favorite-tracks' component={Favorites} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;