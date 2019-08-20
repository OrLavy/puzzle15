import { Store } from 'redux';
import { createStoreInstance } from './root-store';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

console.log('Is dev:', isDev);

let storeInstance : Store;

export default function getStore() : { store: Store } {
  if (!storeInstance) {
    ({ store: storeInstance  } = createStoreInstance(isDev));
  }

  return {
    store: storeInstance,
  };
}
