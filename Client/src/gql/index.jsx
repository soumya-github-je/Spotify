import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  export const GraphQLProvider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );