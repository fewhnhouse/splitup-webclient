import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

import Main from "./MainContainer";

const store = createStore(
  reducers,
  devToolsEnhancer() // Specify custom devTools options
);

const uploadLink = createUploadLink({
  uri: "http://localhost:4000",
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink.concat(uploadLink)
  ]),
  cache: new InMemoryCache()
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  </Provider>
);

export default App;
