import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppNavigator from './navigator/AppNavigator';

const initialState = {
  menuState: '',
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

    default: {
      return state;
    }
  }
};

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
