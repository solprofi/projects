import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from './navigator/AppNavigator';

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx',
  credentials: 'same-origin',
  headers: {
    Authorization: 'Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840',
  },
});

const initialState = {
  menuState: '',
  projectCardState: '',
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU': {
      return {
        ...state,
        menuState: 'closeMenu',
      };
    }
    case 'OPEN_MENU': {
      return {
        ...state,
        menuState: 'openMenu',
      };
    }
    case 'OPEN_CARD': {
      return {
        ...state,
        projectCardState: 'openCard',
      };
    }
    case 'CLOSE_CARD': {
      return {
        ...state,
        projectCardState: 'closeCard',
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(rootReducer);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
);

export default App;
