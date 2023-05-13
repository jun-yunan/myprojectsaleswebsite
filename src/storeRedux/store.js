import { configureStore } from '@reduxjs/toolkit';
import getUserReducer from '~/Pages/Profile/profileSlice';
import signInReducer from '~/Pages/UserAuthentication/components/SignIn/signInSlice';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import persistConfig from '~/persistConfig';
// import rootReducer from './reducer';

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
    reducer: {
        getUser: getUserReducer,
        signIn: signInReducer,
    },
});

// export const persistor = persistStore(store);
