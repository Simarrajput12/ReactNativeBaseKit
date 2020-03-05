import { applyMiddleware, createStore,compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';
import { routerMiddleware } from './navigator';

const ConfigureStore = () => {
  let composeEnhancers = compose;

  if (__DEV__) {
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(routerMiddleware, sagaMiddleware)
  ));  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return {
    persistor,
    store,
  };
};

export default ConfigureStore;
