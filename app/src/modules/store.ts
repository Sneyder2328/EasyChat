import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Action, ThunkAction} from "@reduxjs/toolkit";
import { EasyChatState, rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, applyMiddleware(createLogger(), thunk));

export const persistor = persistStore(store);

export type AppThunk = ThunkAction<void, EasyChatState, unknown, Action<string>>