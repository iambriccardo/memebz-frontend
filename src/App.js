import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './Home'

const client = new ApolloClient({
  uri: 'https://memebz.herokuapp.com/graphql',
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
  );
}

export default App;
