import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import auth from "./accountReducer";

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

//  const persistedReducer = persistReducer(persistConfig, auth)  


// export default () => {
//    let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
//   }

//const store = createStore(rootReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(rootReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// export default store;