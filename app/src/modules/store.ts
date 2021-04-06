import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Action, ThunkAction} from "@reduxjs/toolkit";
import { RootState, rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const store = createStore(rootReducer, applyMiddleware(createLogger(), thunk));

export const persistor = persistStore(store);

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>