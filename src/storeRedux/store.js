import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '~/Pages/Profile/profileSlice';
import signInReducer from '~/Pages/UserAuthentication/components/SignIn/signInSlice';
import avatarReducer from '~/components/Avatar/avatarSlice';
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
        profileUser: profileReducer,
        signIn: signInReducer,
        avatar: avatarReducer,
    },
});

// export const persistor = persistStore(store);
