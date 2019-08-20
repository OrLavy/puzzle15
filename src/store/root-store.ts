import { Store } from 'redux';
import { configureStore } from 'redux-starter-kit';

import rootReducer from './root-reducer';

export function createStoreInstance(isDev: boolean) : { store: Store } {
  // create store
  const store = configureStore({
    // @ts-ignore
    reducer: rootReducer,
    middleware: [],
    devTools: isDev,
    enhancers: [],
  });

  return {
    store,
  }
}

