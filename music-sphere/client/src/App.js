import React from 'react';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink, 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchAlbums from '../src/pages/SearchAlbums';
import SavedAlbums from '../src/pages/SavedAlbums';
// import UserProfile from '..src/pages/UserProfile';
import Navbar from '../src/components/NavBar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', //research about this
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Routes>
              <Route 
                path='/' 
                element={<SearchAlbums />} 
              />
              <Route 
                path='/saved' 
                element={<SavedAlbums />} 
              />
              <Route 
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>}
              />
            </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;