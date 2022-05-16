import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
})

export const persistor = persistStore(store)

export default store;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch