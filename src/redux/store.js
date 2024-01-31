import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { contactsReducer } from './contacts/contactsSlice';
import { authReducer } from './auth/authSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']
}

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        auth: persistReducer(authConfig, authReducer)
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
});

